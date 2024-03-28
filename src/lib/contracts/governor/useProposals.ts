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
import { useMemo } from "react";
import { useChainId, useReadContracts } from "wagmi";

const useProposals = () => {
  const chainId = useChainId();
  const contracts = useContracts();

  const {
    data: { proposals: graphProposals },
    networkStatus: graphNetworkStatus,
  } = useGetProposalsSuspenseQuery({
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
    refetchWritePolicy: "overwrite",
    errorPolicy: "ignore",
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

  return {
    proposals,
  };
};

export default useProposals;