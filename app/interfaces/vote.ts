export interface Vote {
    address: string;
    votes: number;
    type: VoteType;
}

export type VoteType = 'for' | 'against' | 'abstain';