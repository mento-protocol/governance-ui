export interface IVote {
    address: string;
    votes: number;
    type: IVoteType;
}

export type IVoteType = "for" | "against" | "abstain";
