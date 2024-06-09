import { getSubgraphApiName } from "@/config/config.constants";
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
import { useEffect, useMemo } from "react";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";

export const ProposalQueryKey = "proposal";

const useProposal = (proposalId: bigint) => {
  const { chainId } = useAccount();
  const contracts = useContracts();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const {
    data: { proposals: graphProposals },
    networkStatus: graphNetworkStatus,
    refetch: graphRefetch,
  } = useGetProposalSuspenseQuery({
    context: {
      apiName: getSubgraphApiName(chainId),
    },
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
    queryKey: ProposalQueryKey,
    variables: {
      id: proposalId.toString(),
    },
  });

  const { data: chainData, refetch } = useReadContract({
    address: contracts.MentoGovernor.address,
    abi: GovernorABI,
    functionName: "state",
    args: [proposalId],
    scopeKey: ProposalQueryKey,
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
      ...(graphProposal as Proposal),
      state: STATE_FROM_NUMBER[chainData],
    };
  }, [chainData, graphProposals]);

  useEffect(() => {
    if (blockNumber) {
      graphRefetch({
        id: proposalId.toString(),
      }).then(() => {
        refetch();
      });
    }
  }, [blockNumber, graphRefetch, proposalId, refetch]);

  return {
    proposal,
  };
};

export default useProposal;
