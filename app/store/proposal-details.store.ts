import { create } from "zustand";
import { IVote, IVoteType } from "@interfaces/vote.interface";

type ProposalVotesMap = {
  [key in IVoteType]: IVote[];
};

interface ProposalDetailsStore {
  proposal?: any;
  isFetching: boolean;
  fetch: (id: string) => Promise<void>;
  fetchVotes: () => Promise<void>;
  votes: ProposalVotesMap;
  vote: (type: IVoteType, value: number, address: string) => Promise<void>;
  create: (proposal: any) => Promise<void>;
}

export const useProposalDetailsStore = create<ProposalDetailsStore>(
  (set, get) => ({
    proposal: undefined,
    isFetching: false,
    votes: {
      for: [],
      against: [],
      abstain: [],
    },
    fetch: async (id) => {
      set({ isFetching: true });

      const proposalResponse = await fetch(`/api/proposals/${id}`);

      const proposalResponseJson = (await proposalResponse.json()) as any;

      const proposal = {
        ...proposalResponseJson,
        createdAt: new Date(proposalResponseJson.createdAt),
        deadlineAt: new Date(proposalResponseJson.deadlineAt),
      } as any;

      set({ proposal });
      await get().fetchVotes();
    },
    fetchVotes: async () => {
      set({ isFetching: true });

      const id = get().proposal?.id;
      if (!id) {
        return;
      }

      const votesResponse = await fetch(`/api/proposals/${id}/votes`);

      const votesResponseJson = (await votesResponse.json()) as IVote[];

      const votes: ProposalVotesMap = {
        for: votesResponseJson.filter((vote: IVote) => vote.type === "for"),
        against: votesResponseJson.filter(
          (vote: IVote) => vote.type === "against",
        ),
        abstain: votesResponseJson.filter(
          (vote: IVote) => vote.type === "abstain",
        ),
      };

      set({ votes, isFetching: false });
    },
    vote: async (type, value, address) => {
      const id = get().proposal?.id;
      if (!id) {
        return;
      }

      await fetch(`/api/proposals/${id}/votes/${type}`, {
        method: "PUT",
        body: JSON.stringify({
          value,
          address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await get().fetchVotes();
    },
    create: async (proposal) => {
      await fetch(`/api/proposals`, {
        method: "PUT",
        body: JSON.stringify(proposal),
      });
    },
  }),
);
