import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import { useReadContract } from "wagmi";

interface ILockHook {
  lock: Lock;
}

const useLock = ({ lock }: ILockHook) => {
  const { Locking } = useContracts();

  const { data: lockData } = useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [lock.amount, lock.slope, lock.cliff],
  });

  return {
    lockData,
  };
};

export default useLock;
