import { useContracts } from "@/lib/contracts/useContracts";
import { useAccount, useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

export const useAvailableToWithdraw = () => {
  const { Locking } = useContracts();
  const ensuredChainId = useEnsureChainId();
  const { address } = useAccount();

  const { data: availableToWithdraw = 0n, refetch } = useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getAvailableForWithdraw",
    args: address ? [address] : undefined,
    chainId: ensuredChainId,
    query: {
      refetchOnReconnect: true,
      enabled: !!address,
    },
  });

  return {
    availableToWithdraw,
    refetchAvailableToWithdraw: refetch,
  };
};
