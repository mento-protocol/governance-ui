"use client";
import { useAccount, useReadContracts } from "wagmi";
import { useContracts } from "@/lib/contracts/useContracts";
import { useMemo } from "react";
import { erc20Abi } from "viem";
import { formatUnitsWithRadix } from "@/lib/helpers/numbers.service";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { CELO_BLOCK_TIME } from "@/config/config.constants";

export type TokenBalance = {
  decimals: number;
  value: bigint;
  symbol: string;
  formatted: string;
};

export const useTokens = () => {
  const {
    Locking: { address: veTokenAddress },
    MentoToken: { address: mentoAddress },
  } = useContracts();

  const { isConnected, address } = useAccount();

  const ensuredChainId = useEnsureChainId();

  const { data: tokenData, isSuccess } = useReadContracts({
    allowFailure: false,
    contracts: [
      // mento
      {
        address: mentoAddress,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: ensuredChainId,
      },
      {
        address: mentoAddress,
        abi: erc20Abi,
        functionName: "name",
        chainId: ensuredChainId,
      },
      {
        address: mentoAddress,
        abi: erc20Abi,
        functionName: "symbol",
        chainId: ensuredChainId,
      },
      {
        address: mentoAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
        chainId: ensuredChainId,
      },
      // veMento
      {
        address: veTokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
        chainId: ensuredChainId,
      },
      {
        address: veTokenAddress,
        abi: erc20Abi,
        functionName: "name",
        chainId: ensuredChainId,
      },
      {
        address: veTokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
        chainId: ensuredChainId,
      },
      {
        address: veTokenAddress,
        abi: erc20Abi,
        functionName: "totalSupply",
        chainId: ensuredChainId,
      },
    ],
  });

  const { mentoContractData, veMentoContractData } = useMemo(() => {
    // TODO: consider if fetch is valid since we know this should never change, total supply is nice though
    if (isSuccess) {
      const [
        mentoDecimal,
        mentoName,
        mentoSymbol,
        mentoTotalSupply,
        veMentoDecimal,
        veMentoName,
        veMentoSymbol,
        veMentoTotalSupply,
      ] = tokenData;
      return {
        mentoContractData: {
          decimals: mentoDecimal,
          name: mentoName,
          symbol: mentoSymbol,
          totalSupply: mentoTotalSupply,
        },
        veMentoContractData: {
          decimals: veMentoDecimal,
          name: veMentoName,
          symbol: veMentoSymbol,
          totalSupply: veMentoTotalSupply,
        },
      };
    } else {
      return {
        mentoContractData: {
          decimals: 18,
          symbol: "MENTO",
          totalSupply: 0n,
          name: "MENTO",
        },
        veMentoContractData: {
          decimals: 18,
          symbol: "veMENTO",
          totalSupply: 0n,
          name: "veMENTO",
        },
      };
    }
  }, [isSuccess, tokenData]);

  const {
    data: balanceData,
    isSuccess: balanceFetchSuccess,
    isLoading: isBalanceLoading,
  } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        abi: erc20Abi,
        address: mentoAddress,
        functionName: "balanceOf",
        args: [address!],
        chainId: ensuredChainId,
      },
      {
        abi: erc20Abi,
        address: veTokenAddress,
        functionName: "balanceOf",
        args: [address!],
        chainId: ensuredChainId,
      },
    ],
    scopeKey: "token-hook",
    query: {
      refetchInterval: CELO_BLOCK_TIME,
      enabled: isConnected && !!address,
      // initialData: [0n, 0n],
    },
  });

  const {
    mentoBalance,
    veMentoBalance,
  }: {
    mentoBalance: TokenBalance;
    veMentoBalance: TokenBalance;
  } = useMemo(() => {
    if (balanceFetchSuccess) {
      const [mentoData, veMentoData] = balanceData;
      return {
        mentoBalance: {
          decimals: mentoContractData.decimals,
          symbol: mentoContractData.symbol,
          value: mentoData,
          formatted: formatUnitsWithRadix(
            mentoData,
            mentoContractData.decimals,
            2,
          ),
        },
        veMentoBalance: {
          decimals: veMentoContractData.decimals,
          symbol: veMentoContractData.symbol,
          value: veMentoData,
          formatted: formatUnitsWithRadix(
            veMentoData,
            veMentoContractData.decimals,
            2,
          ),
        },
      };
    } else {
      return {
        mentoBalance: {
          decimals: mentoContractData.decimals,
          symbol: mentoContractData.symbol,
          value: 0n,
          formatted: "0",
        },
        veMentoBalance: {
          decimals: veMentoContractData.decimals,
          symbol: veMentoContractData.symbol,
          value: 0n,
          formatted: "0",
        },
      };
    }
  }, [
    balanceData,
    balanceFetchSuccess,
    mentoContractData.decimals,
    mentoContractData.symbol,
    veMentoContractData.decimals,
    veMentoContractData.symbol,
  ]);

  return {
    isBalanceLoading,
    veMentoBalance,
    mentoBalance,
    mentoContractData,
    veMentoContractData,
  };
};

export default useTokens;
