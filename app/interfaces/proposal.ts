import {BadgeType} from "@/app/types";

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
    createdAt: Date;
    deadlineAt: Date;
}

export const statusToBadgeColorMap =  {
    [ProposalStatus.active]: 'success' as BadgeType,
    [ProposalStatus.pending]: 'secondary' as BadgeType,
    [ProposalStatus.executed]: 'info' as BadgeType,
    [ProposalStatus.defeated]: 'tertiary' as BadgeType,
}