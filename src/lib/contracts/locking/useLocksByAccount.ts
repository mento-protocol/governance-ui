import { getSubgraphApiName } from "@/config/config.constants";
import {
  useGetLocksSuspenseQuery,
  Lock,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

interface UseLocksProps {
  account: string;
}

const useLocksByAccount = ({ account }: UseLocksProps) => {
  const ensuredChainId = useEnsureChainId();
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
      apiName: getSubgraphApiName(ensuredChainId),
    },
  });

  return {
    locks: locks as Lock[],
    ...rest,
  };
};

export default useLocksByAccount;
