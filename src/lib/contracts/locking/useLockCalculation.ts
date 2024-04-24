import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import { parseUnits } from "viem";
import { useReadContract } from "wagmi";

interface ILockHook {
  lock: Pick<Lock, "slope" | "cliff"> & { amount: number };
}

const useLockCalculation = ({ lock }: ILockHook) => {
  const { Locking } = useContracts();

  return useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [parseUnits(lock.amount.toString(), 1), lock.slope, lock.cliff],
    query: {
      enabled: lock.amount > 0 && lock.slope > 0,
    },
  });
};

export default useLockCalculation;
