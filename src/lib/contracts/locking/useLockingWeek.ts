import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";

const useLockingWeek = () => {
  const { Locking } = useContracts();
  const { data: currentWeek } = useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
    scopeKey: "lock-get-week",
    args: [],
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
    },
  });

  return {
    currentWeek,
  };
};

export default useLockingWeek;
