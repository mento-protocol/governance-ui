import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

const useLockingWeek = () => {
  const { Locking } = useContracts();
  const ensuredChainId = useEnsureChainId();

  const {
    data: currentWeek,
    isLoading,
    ...rest
  } = useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
    scopeKey: "lock-get-week",
    args: [],
    chainId: ensuredChainId,
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
    },
  });

  return {
    isLoading,
    currentWeek,
    ...rest,
  };
};

export default useLockingWeek;
