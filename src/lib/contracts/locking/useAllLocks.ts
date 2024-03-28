import {
  Lock,
  useGetAllLocksSuspenseQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useChainId } from "wagmi";

const useAllLocks = () => {
  const chainId = useChainId();
  const {
    data: { locks },
  } = useGetAllLocksSuspenseQuery({
    queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
  });

  return {
    locks: locks as Lock[],
  };
};

export default useAllLocks;
