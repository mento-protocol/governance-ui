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
    queryKey: "locking-contract-hook",
    refetchWritePolicy: "overwrite",
    variables: {
      address: account,
    },
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
  });

  return {
    locks: locks as Lock[],
    ...rest,
  };
};

export default useLocksByAccount;
