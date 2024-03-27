import { useGetLocksSuspenseQuery } from "@/lib/graphql/subgraph/generated/subgraph";
import { Address } from "viem";
import { useChainId } from "wagmi";

interface UseGetLocksProps {
  account: Address;
}
const useGetLocks = ({ account }: UseGetLocksProps) => {
  const chainId = useChainId();
  const {
    data: { locks },
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
  //   const { data, refetch } = useSuspenseQuery<{ locks: Lock[] }>(
  //     GetLocksDocument,
  //     {
  //       variables: { address },
  //       context: {
  //         apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
  //       },
  //     },
  //   );

  return {
    locks,
  };
};

export default useGetLocks;
