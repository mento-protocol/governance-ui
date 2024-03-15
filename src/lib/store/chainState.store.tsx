import type { Address, MulticallParameters, PublicClient } from "viem";
import { erc20Abi } from "viem";
import { MentoChain } from "../types";

interface TokenWithBalance {
  symbol: string;
  decimals: number;
  address: Address;
  balance: bigint;
}

interface ChainStateData {
  // Internals:
  client: PublicClient | undefined;
  refreshInterval: ReturnType<typeof setInterval> | null;
  initialized: boolean;
  ready: boolean;
  chainId: number;
  wallet: Address;
  contracts: MentoChain["contracts"] | null;
  // State:
  tokens: {
    mento: TokenWithBalance;
    veMento: TokenWithBalance;
  };
}

interface ChainStateActions {
  init: (
    chainId: MentoChain["id"],
    contracts: MentoChain["contracts"],
    wallet: Address,
    client: PublicClient | undefined,
  ) => void;
  clear: () => void;
  load: (viewCalls: ViewCall[]) => Promise<void>;
}

export type ChainState = ChainStateData & ChainStateActions;

const emptyTokenBalance: TokenWithBalance = {
  balance: BigInt(0),
  symbol: "",
  decimals: 0,
  address: "0x",
};

const INITIAL_STATE: ChainStateData = {
  initialized: false,
  refreshInterval: null,
  ready: false,
  chainId: 0,
  wallet: "0x0",
  client: undefined,
  contracts: null,
  tokens: {
    mento: emptyTokenBalance,
    veMento: emptyTokenBalance,
  },
};

/*
 * Interface of a ViewCall.
 * The store has multiple view calls that are loaded and refreshed
 * and exposed as state to the application.
 * Centralizing them here will result in a single RCP call to a mulicall
 * contract, instead of multiple calls to different contracts.
 */
interface ViewCall {
  call: MulticallParameters["contracts"][0];
  update: (result: any) => (state: ChainState) => void;
  refresh: boolean;
}

/*
 * Helper to return a balanceOf multicall getter
 */
const balanceOf = (token: Address, wallet: Address) => ({
  address: token,
  abi: erc20Abi,
  functionName: "balanceOf",
  args: [wallet],
});

/*
 * This function is used to compile all view calls that will be
 * loaded and refreshed always in the app.
 * @dev: Add global view calls here, like the contract params.
 */
const compileViewCalls = (state: ChainStateData): ViewCall[] => {
  return [
    {
      // $MENTO.balanceOf(wallet) -> state.tokens.mento.balance
      call: balanceOf(state.tokens.mento.address, state.wallet),
      update: (result: bigint) => (state: ChainState) => {
        state.tokens.mento.balance = result;
      },
      refresh: true,
    },
    {
      // $veMENTO.balanceOf(wallet) -> state.tokens.veMento.balance
      call: balanceOf(state.tokens.veMento.address, state.wallet),
      update: (result: bigint) => (state: ChainState) => {
        state.tokens.veMento.balance = result;
      },
      refresh: true,
    },
  ];
};

export type ChainStateStore = ReturnType<typeof createChainStateStore>;
export const createChainStateStore = () => {
  return createStore<ChainState>()(
    immer((set, get) => ({
      ...INITIAL_STATE,
      init: (
        chainId: MentoChain["id"],
        contracts: MentoChain["contracts"],
        wallet: Address,
        client: PublicClient | undefined,
      ) => {
        if (get().initialized === true) {
          get().clear();
        }
        set((state) => {
          return {
            ...state,
            wallet,
            client,
            initialized: true,
            ready: false,
            chainId: chainId,
            contracts: contracts,
            tokens: {
              mento: {
                symbol: "MENTO",
                decimals: 18,
                address: contracts.MentoToken.address,
                balance: BigInt(0),
              },
              veMento: {
                symbol: "veMENTO",
                decimals: 18,
                address: contracts.Locking.address,
                balance: BigInt(0),
              },
            },
            viewCalls: [],
          };
        });

        const viewCalls = compileViewCalls(get());

        // Initial load
        get()
          .load(viewCalls)
          .then(() => {
            set((state) => {
              state.ready = true;
            });
          });

        // Refresh viewCalls that are marked with refresh
        const refreshInterval = setInterval(() => {
          get().load(viewCalls.filter((viewCall) => viewCall.refresh === true));
        }, 40000); // TODO: Make refresh interval configurable

        set((state) => {
          state.refreshInterval = refreshInterval;
        });
      },
      load: async (viewCalls: ViewCall[]) => {
        const client = get().client;
        if (client == null) return;
        const results = await client.multicall({
          contracts: viewCalls.map((viewCall) => viewCall.call),
        });
        results.forEach((result, index) => {
          if (result.status == "success") {
            set(viewCalls[index].update(result.result));
          } else {
            console.error(
              `Error fetching ${viewCalls[index].call.address}.${viewCalls[index].call.functionName}`,
            );
          }
        });
      },
      clear: () => {
        const intervalId = get().refreshInterval;
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
      },
    })),
  );
};
