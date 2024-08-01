import { getSubgraphApiName } from "@/config/config.constants";
import {
  Lock,
  useGetAllLocksQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

const useAllLocks = () => {
  const ensuredChainId = useEnsureChainId();
  const { data, loading } = useGetAllLocksQuery({
    // queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
    context: {
      apiName: getSubgraphApiName(ensuredChainId),
    },
  });

  return {
    locks: data?.locks ?? ([] as Lock[]),
    loading,
  };
};

export default useAllLocks;
