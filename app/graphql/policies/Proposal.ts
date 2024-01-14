import { ProposalState } from "../generated/graphql";
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
  },
};
