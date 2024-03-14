import { createContext, useContext, useEffect, useRef } from "react";
import { useAccount, useChainId, usePublicClient } from "wagmi";
import { useStore } from "zustand";
import { useContracts } from "../hooks/useContracts";
import {
  ChainState,
  ChainStateStore,
  createChainStateStore,
} from "../store/chainState.store";

type ChainStateProviderProps = React.PropsWithChildren<{}>;

export const ChainStateContext = createContext<ChainStateStore | null>(null);
export const ChainStateProvider = ({ children }: ChainStateProviderProps) => {
  const storeRef = useRef<ChainStateStore>();
  if (!storeRef.current) {
    storeRef.current = createChainStateStore();
  }
  const chainId = useChainId();
  const contracts = useContracts();
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
      state.init(chainId, contracts!, account.address!, client);
    }
  }, [chainId, contracts, account, client]);

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
