import {create} from "zustand";

import IProposal from "@interfaces/proposal.interface";
interface ProposalListStore {
    proposals: IProposal[];
    isFetching: boolean;
    fetch: () => Promise<void>;
}

export const useProposalsListStore = create<ProposalListStore>((set) => ({
    proposals: [],
    isFetching: false,
    fetch: async () => {
        set({ isFetching: true })
        const res = await fetch('/api/proposals');
        set({ proposals: await res.json(), isFetching: false })
    }
}))