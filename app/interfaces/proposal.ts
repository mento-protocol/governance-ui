export enum ProposalStatus {
    active = 'active',
    pending = 'pending',
    executed = 'executed',
    defeated = 'defeated',
}

export default interface Proposal {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    status: ProposalStatus;
    votesTotal: number;
    votesYes: number;
    votesNo: number;
    creator?: string;
    createdAt?: Date;
    deadlineAt?: Date;
}