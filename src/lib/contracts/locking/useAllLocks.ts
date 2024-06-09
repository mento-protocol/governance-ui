import { getSubgraphApiName } from "@/config/config.constants";
import {
  Lock,
  useGetAllLocksSuspenseQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useAccount } from "wagmi";

const useAllLocks = () => {
  const { chainId } = useAccount();
  const {
    data: { locks },
  } = useGetAllLocksSuspenseQuery({
    queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
    context: {
      apiName: getSubgraphApiName(chainId),
    },
  });

  return {
    locks: locks as Lock[],
  };
};

export default useAllLocks;
