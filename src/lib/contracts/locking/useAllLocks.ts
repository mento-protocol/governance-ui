import { getSubgraphApiName } from "@/config/config.constants";
import {
  Lock,
  useGetAllLocksSuspenseQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

const useAllLocks = () => {
  const ensuredChainId = useEnsureChainId();
  const {
    data: { locks },
  } = useGetAllLocksSuspenseQuery({
    queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
    context: {
      apiName: getSubgraphApiName(ensuredChainId),
    },
  });

  return {
    locks: locks as Lock[],
  };
};

export default useAllLocks;
