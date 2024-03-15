import { useSuspenseQuery } from "@apollo/client";
import { GetProposals, Proposal } from "@lib/graphql";
import { useChainId } from "wagmi";

const useGetProposals = () => {
  const chainId = useChainId();
  const {
    data: { proposals },
  } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposals, {
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
    queryKey: "governor-contract-hook",
    refetchWritePolicy: "overwrite",
  });

  return {
    proposals,
  };
};

export default useGetProposals;
