import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { useSuspenseQuery } from "@apollo/client";
import { GetAllLocks, Lock } from "@/lib/graphql";

const useLockingContract = () => {
  const contracts = useContracts();
  const {
    data: { locks },
  } = useSuspenseQuery<{ locks: Lock[] }>(GetAllLocks, {
    queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
  });

  const { data: totalSupply } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "totalSupply",
    args: [],
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
    },
  });

  const { data: currentWeek } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
    args: [],
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
    },
  });

  return {
    totalSupply,
    locks,
    currentWeek,
  };
};

export default useLockingContract;
