import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import { useReadContract } from "wagmi";

interface ILockHook {
  lock: Pick<Lock, "amount" | "slope" | "cliff">;
}

const useLockCalculation = ({ lock }: ILockHook) => {
  const { Locking } = useContracts();

  return useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [lock.amount, lock.slope, lock.cliff],
    query: {
      enabled: lock.amount > 0 && lock.slope > 0 && lock.cliff > 0,
    },
  });
};

export default useLockCalculation;
