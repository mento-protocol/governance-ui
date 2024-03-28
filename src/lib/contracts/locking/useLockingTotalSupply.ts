import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";

const useLockingTotalSupply = () => {
  const { Locking } = useContracts();

  const { data: totalSupply } = useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "totalSupply",
    scopeKey: "lock-total-supply",
    args: [],
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
    },
  });

  return {
    totalSupply,
  };
};

export default useLockingTotalSupply;
