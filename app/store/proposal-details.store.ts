import {create} from "zustand";

import IProposal from "@interfaces/proposal.interface";
import {IVote, IVoteType} from "@interfaces/vote.interface";

type ProposalVotesMap = {
    [key in IVoteType]: IVote[];
};

interface ProposalDetailsStore {
    proposal?: IProposal;
    isFetching: boolean;
    fetch: (id: string) => Promise<void>;
    refetchVotes: () => Promise<void>;
    votes: ProposalVotesMap;
    vote: (type: IVoteType, value: number, address: string) => Promise<void>;
}

const useProposalDetailsStore = create<ProposalDetailsStore>((set, get) => ({
    proposal: undefined,
    isFetching: false,
    votes: {
        for: [],
        against: [],
        abstain: [],
    },
    fetch: async (id) => {
        set({isFetching: true})

        const proposalResponse = await fetch(`/api/proposals/${id}`);
        const votesResponse = await fetch(`/api/proposals/${id}/votes`);

        const proposalResponseJson = await proposalResponse.json();

        const votesResponseJson = await votesResponse.json();

        const votes: ProposalVotesMap = {
            for: votesResponseJson.filter((vote: IVote) => vote.type === 'for'),
            against: votesResponseJson.filter((vote: IVote) => vote.type === 'against'),
            abstain: votesResponseJson.filter((vote: IVote) => vote.type === 'abstain'),
        };

        const proposal = {
            ...proposalResponseJson,
            createdAt: new Date(proposalResponseJson.createdAt),
            deadlineAt: new Date(proposalResponseJson.deadlineAt),
        } as IProposal

        set({proposal, votes, isFetching: false})
    },
    refetchVotes: async () => {
        set({isFetching: true})

        const id = get().proposal?.id;
        if (!id) {
            return;
        }

        const votesResponse = await fetch(`/api/proposals/${id}/votes`);

        const votesResponseJson = await votesResponse.json();

        const votes: ProposalVotesMap = {
            for: votesResponseJson.filter((vote: IVote) => vote.type === 'for'),
            against: votesResponseJson.filter((vote: IVote) => vote.type === 'against'),
            abstain: votesResponseJson.filter((vote: IVote) => vote.type === 'abstain'),
        };

        set({votes, isFetching: false})
    },
    vote: async (type, value, address) => {
        const id = get().proposal?.id;
        if (!id) {
            return;
        }

        await fetch(`/api/proposals/${id}/votes/${type}`, {
            method: 'PUT',
            body: JSON.stringify({
                value,
                address,
            }),
        });

        await get().refetchVotes();
    }
}))

export default useProposalDetailsStore;