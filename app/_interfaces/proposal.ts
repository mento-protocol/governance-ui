export enum ProposalStatus {
    active,
    pending,
    executed,
    defeated
}

export interface Proposal {
    name: string;
    status: ProposalStatus;
    votesTotal: number;
    votesYes: number;
    votesNo: number;
}