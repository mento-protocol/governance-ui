import { getSubgraphApiName } from "@/config/config.constants";
import {
  useGetLocksSuspenseQuery,
  Lock,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useChainId } from "wagmi";

interface UseLocksProps {
  account: string;
}

const useLocksByAccount = ({ account }: UseLocksProps) => {
  const chainId = useChainId();
  const {
    data: { locks },
    ...rest
  } = useGetLocksSuspenseQuery({
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
    variables: {
      address: account,
    },
    context: {
      apiName: getSubgraphApiName(chainId),
    },
  });

  return {
    locks: locks as Lock[],
    ...rest,
  };
};

export default useLocksByAccount;
