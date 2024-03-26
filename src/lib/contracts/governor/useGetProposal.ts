import { GovernorABI } from "@/lib/abi/Governor";
import {
  STATE_FROM_NUMBER,
  isStateNumber,
} from "@/lib/contracts/governor/hookHelpers";
import { useContracts } from "@/lib/contracts/useContracts";
import {
  Proposal,
  useGetProposalSuspenseQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { NetworkStatus } from "@apollo/client";
import { useMemo } from "react";
import { useChainId, useReadContract } from "wagmi";

const useGetProposal = (proposalId: bigint) => {
  const chainId = useChainId();
  const contracts = useContracts();

  const {
    data: { proposals: graphProposals },
    networkStatus: graphNetworkStatus,
  } = useGetProposalSuspenseQuery({
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
    refetchWritePolicy: "overwrite",
    errorPolicy: "ignore",
    queryKey: "get-proposal-hook",
    variables: {
      id: proposalId,
    },
  });

  const { data: chainData } = useReadContract({
    address: contracts.MentoGovernor.address,
    abi: GovernorABI,
    functionName: "state",
    args: [proposalId],
    query: {
      refetchInterval: 5000,
      enabled:
        graphNetworkStatus === NetworkStatus.ready && graphProposals.length > 0,
    },
  });

  const proposal: Proposal | undefined = useMemo<Proposal | undefined>(() => {
    if (graphProposals === undefined || graphProposals.length === 0) return;
    const graphProposal = graphProposals[0];

    if (chainData === undefined || !isStateNumber(chainData))
      return graphProposal as Proposal;

    return {
      ...(proposal as Proposal),
      state: STATE_FROM_NUMBER[chainData],
    };
  }, [chainData, graphProposals]);

  return {
    proposal,
  };
};

export default useGetProposal;
