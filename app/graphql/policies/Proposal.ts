import { ProposalState, ProposalSupport } from "../generated/graphql";
import { proposalToStateVar } from "@/app/hooks/useProposalStates";
import { TypePolicy } from "@apollo/client/cache";

export const ProposalPolicy: TypePolicy = {
  fields: {
    state: {
      read(_, { readField }): ProposalState {
        const id = readField<string>("proposalId");
        const proposalToState = proposalToStateVar();
        return proposalToState[id!] || ProposalState.NoState;
      },
    },
    metadata: {
      read(_, { readField }): { title: string; description: string } {
        const rawMetadata = readField<string>("description") || "";
        let metadata;
        try {
          metadata = JSON.parse(readField<string>("description")!);
        } catch (e) {
          metadata = {
            title: rawMetadata.split("\n")[0],
            description: rawMetadata,
          };
        }

        return {
          title: metadata.title || "Missing title",
          description: metadata.description || "Missing description",
        };
      },
    },
    votesAgainst: {
      read(_, { readField }): BigInt {
        const supports = readField<Array<ProposalSupport>>("supports");
        const vote = supports?.find((data) => data.support === 0);
        return BigInt(vote?.weight || 0);
      },
    },
    votesFor: {
      read(_, { readField }): BigInt {
        const supports = readField<Array<ProposalSupport>>("supports");
        const vote = supports?.find((data) => data.support === 1);
        return BigInt(vote?.weight || 0);
      },
    },
    votesAbstain: {
      read(_, { readField }): BigInt {
        const supports = readField<Array<ProposalSupport>>("supports");
        const vote = supports?.find((data) => data.support === 2);
        return BigInt(vote?.weight || 0);
      },
    },
    votesTotal: {
      read(_, { readField }): BigInt {
        const supports = readField<Array<ProposalSupport>>("supports");
        if (supports) {
          const votesAgainst = supports?.find((data) => data.support === 0);
          const votesAgainstWeight = BigInt(votesAgainst?.weight || 0);

          const votesFor = supports?.find((data) => data.support === 1);
          const votesForWeight = BigInt(votesFor?.weight || 0);

          return votesForWeight - votesAgainstWeight;
        } else {
          return BigInt(0);
        }
      },
    },
  },
};
