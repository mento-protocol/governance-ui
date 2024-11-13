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
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { NetworkStatus } from "@apollo/client";
import { useEffect, useMemo } from "react";
import { useBlockNumber, useReadContract } from "wagmi";
import { CELO_BLOCK_TIME } from "@/config/config.constants";
export const ProposalQueryKey = "proposal";

const useProposal = (proposalId: bigint) => {
  const contracts = useContracts();
  const ensuredChainId = useEnsureChainId();

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: ensuredChainId,
  });

  const {
    data: { proposals: graphProposals },
    networkStatus: graphNetworkStatus,
    refetch: graphRefetch,
  } = useGetProposalSuspenseQuery({
    context: {
      apiName: getSubgraphApiName(ensuredChainId),
    },
    refetchWritePolicy: "merge",
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
    queryKey: ProposalQueryKey,
    variables: {
      id: proposalId.toString(),
    },
  });

  const {
    data: chainData,
    refetch,
    isLoading: isChainDataLoading,
  } = useReadContract({
    address: contracts.MentoGovernor.address,
    abi: GovernorABI,
    functionName: "state",
    args: [proposalId],
    scopeKey: ProposalQueryKey,
    chainId: ensuredChainId,
    query: {
      refetchInterval: CELO_BLOCK_TIME,
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
    isLoading:
      graphNetworkStatus === NetworkStatus.loading || isChainDataLoading,
  };
};

export default useProposal;
