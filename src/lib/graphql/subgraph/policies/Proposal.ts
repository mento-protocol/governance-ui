import type { Account, Address } from "viem";
import type { TypePolicy } from "@apollo/client/cache";
import { proposalToStateVar } from "@/lib/contracts/governor/useProposalStates";
import {
  ProposalState,
  ProposalSupport,
  ProposalVotes,
  VoteCast,
} from "@/lib/graphql/subgraph/generated/subgraph";

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
            const voterRef = readField<Account>("voter", votecastRef);
            const supportRef = readField<ProposalSupport>(
              "support",
              votecastRef,
            );
            const rawWeight = readField<string>("weight", supportRef) || "";
            const weight = BigInt(rawWeight);

            const address = readField<string>("id", voterRef) as Address;
            const support = readField<ProposalSupport["support"]>(
              "support",
              supportRef,
            );

            switch (support) {
              // AGAINST
              case 0:
                acc.against.total += weight;
                acc.against.participants.push({
                  address,
                  weight,
                });
                break;

              // FOR
              case 1:
                acc.for.total += weight;
                acc.for.participants.push({
                  address,
                  weight,
                });
                break;

              // ABSTAIN
              case 2:
                acc.abstain.total += weight;
                acc.abstain.participants.push({
                  address,
                  weight,
                });
                break;

              default:
                throw new Error(`Invalid support type: ${support}`);
            }
            acc.total += weight;

            return acc;
          },
          {
            for: {
              participants: [],
              total: 0n,
            },
            against: {
              participants: [],
              total: 0n,
            },
            abstain: {
              participants: [],
              total: 0n,
            },
            total: 0n,
          },
        );
      },
    },
  },
};
