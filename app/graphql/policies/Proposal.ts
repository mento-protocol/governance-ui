import { ProposalState, ProposalSupport } from "../generated/graphql";
import { proposalToStateVar } from "@/app/hooks/useProposalStates";
import { TypePolicy } from "@apollo/client/cache";

type Votes = {
  [key: string]: bigint;
  votesAgainst: bigint;
  votesFor: bigint;
  votesAbstain: bigint;
  votesTotal: bigint;
};

const getCalculatedVotes = (votesArray: bigint[]) =>
  votesArray?.reduce((acc, currVal) => BigInt(acc) + BigInt(currVal), 0n);

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
        const supportsRef = readField<Array<ProposalSupport>>("supports");
        const supports = supportsRef?.map((supportRef) => {
          const support = readField("support", supportRef);
          const weight: bigint = readField("weight", supportRef) || 0n;
          return {
            support,
            weight,
          };
        });

        const supportType: { [key: number]: string } = {
          0: "votesAgainst",
          1: "votesFor",
          2: "votesAbstain",
        };

        const reducedSupports = supports?.reduce(
          (acc: Votes, support) => {
            const key = supportType[Number(support.support)];
            acc.votesTotal += BigInt(support.weight);
            acc[key] += BigInt(support.weight);
            return acc;
          },
          {
            votesAgainst: 0n,
            votesFor: 0n,
            votesAbstain: 0n,
            votesTotal: 0n,
          },
        );

        return (
          reducedSupports || {
            votesAgainst: 0n,
            votesFor: 0n,
            votesAbstain: 0n,
            votesTotal: 0n,
          }
        );
      },
    },
  },
};
