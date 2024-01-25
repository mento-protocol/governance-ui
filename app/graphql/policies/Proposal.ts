import { ProposalState, ProposalSupport } from "../generated/graphql";
import { proposalToStateVar } from "@/app/hooks/useProposalStates";
import { TypePolicy } from "@apollo/client/cache";

type Votes = {
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
          const weight: bigint | undefined = readField("weight", supportRef);
          return {
            support,
            weight,
          };
        });

        const getVotesArray = (support: number) =>
          supports
            ?.filter((data) => data.support === support)
            .map((data) => data.weight || 0n) || [];

        const votesAgainstArr = getVotesArray(0);
        const votesForArr = getVotesArray(1);
        const votesAbstainArr = getVotesArray(2);

        const votesAgainst = getCalculatedVotes(votesAgainstArr);
        const votesFor = getCalculatedVotes(votesForArr);
        const votesAbstain = getCalculatedVotes(votesAbstainArr);

        const votesTotal = votesFor - votesAgainst;

        return {
          votesAgainst,
          votesFor,
          votesAbstain,
          votesTotal,
        };
      },
    },
  },
};
