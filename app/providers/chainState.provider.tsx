import { createContext, useContext, useEffect, useRef } from "react";
import { Address, Chain, ChainContract, PublicClient, erc20Abi } from "viem";
import { useChainId, useConfig, useAccount, usePublicClient } from "wagmi";
import { createStore, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ERC20Token {
  symbol: string;
  decimals: number;
  address: Address;
}

interface NetworkToken {
  symbol: string;
  decimals: number;
}

type TokenWithBalance<T> = T & { balance: bigint };

interface ChainStateData {
  refreshInterval: ReturnType<typeof setInterval> | null;
  chainId: number;
  wallet: Address;
  client: PublicClient | null;
  tokens: {
    nativeCurrency: TokenWithBalance<NetworkToken>;
    mento: TokenWithBalance<ERC20Token>;
    veMento: TokenWithBalance<ERC20Token>;
  };
  initialized: boolean;
  ready: boolean;
}

interface ChainStateActions {
  init: (chain: Chain, wallet: Address, client: PublicClient) => void;
  clear: () => void;
  refresh: () => Promise<void>;
}

type ChainState = ChainStateData & ChainStateActions;

type ChainStateStore = ReturnType<typeof createChainStateStore>;

const emptyNetworkTokenBalance: TokenWithBalance<NetworkToken> = {
  symbol: "",
  decimals: 0,
  balance: BigInt(0),
};

const emptyErc20TokenBalance: TokenWithBalance<ERC20Token> = {
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
  wallet: "0x000000",
  client: null,
  tokens: {
    nativeCurrency: emptyNetworkTokenBalance,
    mento: emptyErc20TokenBalance,
    veMento: emptyErc20TokenBalance,
  },
};

const createChainStateStore = () => {
  return createStore<ChainState>()(
    immer((set, get) => ({
      ...INITIAL_STATE,
      init: (chain: Chain, wallet: Address, client: PublicClient) => {
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
            chainId: chain.id,
            tokens: {
              nativeCurrency: {
                symbol: chain.nativeCurrency.symbol,
                decimals: 18,
                balance: BigInt(0),
              },
              mento: {
                symbol: "MENTO",
                decimals: 18,
                address: (chain.contracts!.mento! as ChainContract).address, // TODO maybe smarter typing?
                balance: BigInt(0),
              },
              veMento: {
                symbol: "veMENTO",
                decimals: 18,
                address: (chain.contracts!.locking! as ChainContract).address,
                balance: BigInt(0),
              },
            },
          };
        });

        get().refresh();
        const refreshInterval = setInterval(() => {
          get().refresh();
        }, 20000); // TODO: Make refresh interval configurable

        set((state) => {
          state.refreshInterval = refreshInterval;
        });
      },
      refresh: async () => {
        const client = get().client;
        if (client === null) return;
        const balance = await client.getBalance({
          address: get().wallet,
        });
        console.log(balance);
        set((state) => {
          state.tokens.nativeCurrency.balance = balance;
        });
        const results = await client.multicall({
          contracts: [
            {
              address: get().tokens.mento.address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [get().wallet],
            },
            {
              address: get().tokens.veMento.address,
              abi: erc20Abi,
              functionName: "balanceOf",
              args: [get().wallet],
            },
          ],
        });
        console.log(results);
        const [mentoBalance, veMentoBalance] = results.map((result) =>
          result.result ? result.result : BigInt(0),
        );
        set((state) => {
          state.ready = true;
          state.tokens.mento.balance = mentoBalance;
          state.tokens.veMento.balance = veMentoBalance;
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

type ChainStateProviderProps = React.PropsWithChildren<{}>;

export const ChainStateContext = createContext<ChainStateStore | null>(null);
export const ChainStateProvider = ({ children }: ChainStateProviderProps) => {
  const storeRef = useRef<ChainStateStore>();
  if (!storeRef.current) {
    storeRef.current = createChainStateStore();
  }
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const client = usePublicClient();

  useEffect(() => {
    const state = storeRef.current!.getState();

    if (account.isDisconnected && state.initialized) {
      state.clear();
    }

    if (!account.isConnected) {
      return;
    }

    if (
      !state.initialized ||
      state.chainId !== chainId ||
      state.wallet != account.address
    ) {
      state.init(
        config.chains.find((c) => c.id === chainId)!,
        account.address!,
        client,
      );
    }
  }, [chainId, config.chains, account, client]);

  return (
    <ChainStateContext.Provider value={storeRef.current}>
      {children}
    </ChainStateContext.Provider>
  );
};

export function useChainState<T>(selector: (state: ChainState) => T): T {
  const store = useContext(ChainStateContext);
  if (!store) throw new Error("Missing ChainStateProvider in the tree");
  return useStore(store, selector);
}
