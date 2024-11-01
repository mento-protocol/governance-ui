import type { Account, Address } from "viem";
import { makeVar, type TypePolicy } from "@apollo/client/cache";
import {
  ProposalState,
  ProposalSupport,
  ProposalVotes,
  Scalars,
  VoteCast,
  VoteReceipt,
} from "@/lib/graphql/subgraph/generated/subgraph";

type ProposalID = Scalars["ID"]["output"];
type ProposalToState = Record<ProposalID, ProposalState>;
export const proposalToStateVar = makeVar<ProposalToState>({});

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
      read(_, { readField }): ProposalVotes {
        const votecastRefs = readField<Array<VoteCast>>("votecast") || [];

        return votecastRefs.reduce(
          (acc: ProposalVotes, votecastRef) => {
            const receipt = readField<VoteReceipt>("receipt", votecastRef);
            if (!receipt) return acc;

            const voterRef = readField<Account>("voter", receipt);
            const supportRef = readField<ProposalSupport>("support", receipt);
            const weight = BigInt(readField<string>("weight", receipt) || "0");
            const address = readField<string>("id", voterRef) as Address;
            const support = readField<number>("support", supportRef);
            switch (support) {
              case 0: // AGAINST
                acc.against.total += weight;
                acc.against.participants.push({ address, weight });
                break;

              case 1: // FOR
                acc.for.total += weight;
                acc.for.participants.push({ address, weight });
                break;

              case 2: // ABSTAIN
                acc.abstain.total += weight;
                acc.abstain.participants.push({ address, weight });
                break;

              default:
                throw new Error(`Invalid support type: ${support}`);
            }
            acc.total += weight;

            return acc;
          },
          {
            for: { participants: [], total: 0n },
            against: { participants: [], total: 0n },
            abstain: { participants: [], total: 0n },
            total: 0n,
          },
        );
      },
    },
  },
};
