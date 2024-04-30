import { getSubgraphApiName } from "@/config/config.constants";
import { GovernorABI } from "@/lib/abi/Governor";
import {
  STATE_FROM_NUMBER,
  isStateNumber,
} from "@/lib/contracts/governor/hookHelpers";
import { useContracts } from "@/lib/contracts/useContracts";
import {
  Proposal,
  useGetProposalsSuspenseQuery,
} from "@/lib/graphql/subgraph/generated/subgraph";
import { NetworkStatus } from "@apollo/client";
import { useCallback, useMemo } from "react";
import { useChainId, useReadContracts } from "wagmi";

export const GraphProposalsQueryKey = ["proposals-graph-query"];

const useProposals = () => {
  const chainId = useChainId();
  const contracts = useContracts();

  const {
    data: { proposals: graphProposals },
    networkStatus: graphNetworkStatus,
    refetch,
  } = useGetProposalsSuspenseQuery({
    context: {
      apiName: getSubgraphApiName(chainId),
    },
    refetchWritePolicy: "merge",
    errorPolicy: "ignore",
    queryKey: GraphProposalsQueryKey,
  });

  const { data: chainData } = useReadContracts({
    contracts: (graphProposals as Proposal[]).map(
      (proposal: Proposal) =>
        ({
          address: contracts.MentoGovernor.address,
          abi: GovernorABI,
          functionName: "state",
          args: [proposal.proposalId],
        }) as const,
    ),
    query: {
      refetchInterval: 5000,
      enabled:
        graphNetworkStatus === NetworkStatus.ready && graphProposals.length > 0,
    },
  });

  const proposals: Proposal[] = useMemo<Proposal[]>(() => {
    if (chainData === undefined) return [];
    if (graphProposals === undefined) return [];

    const proposalBuild: Proposal[] = [];
    for (const chainDataKey of chainData.keys()) {
      const proposal = graphProposals[chainDataKey];
      const { status, result } = chainData[chainDataKey];
      if (status !== "success" || !isStateNumber(result)) {
        proposalBuild.push(proposal as Proposal);
        continue;
      }

      proposalBuild.push({
        ...(proposal as Proposal),
        state: STATE_FROM_NUMBER[result],
      });
    }

    return proposalBuild;
  }, [chainData, graphProposals]);

  const proposalExists = useCallback(
    (id: string) => {
      return (
        proposals.filter((proposal) => proposal.proposalId === id).length === 1
      );
    },
    [proposals],
  );

  return {
    proposals,
    proposalExists,
    refetchProposals: refetch,
  };
};

export default useProposals;
