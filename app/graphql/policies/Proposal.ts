import { ProposalState, ProposalSupport } from "../generated/graphql";
import { proposalToStateVar } from "@/app/hooks/useProposalStates";
import { TypePolicy } from "@apollo/client/cache";

type Votes = {
  votesAgainst: bigint;
  votesFor: bigint;
  votesAbstain: bigint;
  votesTotal: bigint;
};

const supportKey = (support: number): keyof Votes => {
  switch (support) {
    case 0:
      return "votesAgainst";
    case 1:
      return "votesFor";
    case 2:
      return "votesAbstain";
    default:
      throw new Error(`Invalid support type: ${support.toString()}`);
  }
};

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
    votes: {
      read(_, { readField }): Votes {
        const supportRefs = readField<Array<ProposalSupport>>("supports") || [];
        return supportRefs.reduce(
          (acc: Votes, supportRef) => {
            const supportType = readField<ProposalSupport["support"]>(
              "support",
              supportRef,
            );
            const weight = readField<ProposalSupport["weight"]>(
              "weight",
              supportRef,
            );
            const key = supportKey(supportType!);

            acc.votesTotal += weight;
            acc[key] += weight;
            return acc;
          },
          {
            votesAgainst: 0n,
            votesFor: 0n,
            votesAbstain: 0n,
            votesTotal: 0n,
          },
        );
      },
    },
  },
};
