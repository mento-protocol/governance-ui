import { useAccount, useBalance, useCall } from "wagmi";
import { useContracts } from "@/lib/contracts/useContracts";
import { useCallback } from "react";

export type TokenBalance = {
  decimal: number;
  value: bigint;
  symbol: string;
  formatted: string;
};

export const useTokens = () => {
  const { Locking, MentoToken } = useContracts();
  const { isConnected } = useAccount();

  const { data: veMentoBalance, refetch: veMentoRefetch } = useBalance({
    address: Locking.address,
    scopeKey: "token-hook",
    query: {
      refetchInterval: 5000,
      enabled: isConnected,
      initialData: {
        decimals: 18,
        formatted: "0",
        symbol: "veMENTO",
        value: 0n,
      },
    },
  });

  const { data: mentoBalance, refetch: mentoRefetch } = useBalance({
    address: MentoToken.address,
    scopeKey: "token-hook",
    query: {
      refetchInterval: 5000,
      enabled: isConnected,
      initialData: {
        decimals: 18,
        formatted: "0",
        symbol: "MENTO",
        value: 0n,
      },
    },
  });

  const refreshTokens = useCallback(() => {
    veMentoRefetch();
    mentoRefetch();
  }, [mentoRefetch, veMentoRefetch]);

  // This type conversion is needed for TS, but due to the initial data settings, this should never be undefined
  return {
    veMentoBalance: veMentoBalance as unknown as TokenBalance,
    mentoBalance: mentoBalance as unknown as TokenBalance,
    refreshTokens,
  };
};

export default useTokens;
