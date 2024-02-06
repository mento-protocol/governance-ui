import { BadgeType } from "@/app/types";
import { ProposalState, ProposalVotes } from "@/app/graphql";

export default interface IProposal {
  id: string;
  title: string;
  description: string;
  state: ProposalState;
  votes: ProposalVotes;
  creator?: string;
  createdAt: Date;
  deadlineAt: Date;
}

export const stateToBadgeColorMap: Record<ProposalState, BadgeType> = {
  [ProposalState.Active]: "primary",
  [ProposalState.Pending]: "secondary",
  [ProposalState.Executed]: "success",
  [ProposalState.Defeated]: "danger",
  [ProposalState.Canceled]: "warning",
  [ProposalState.Expired]: "warning",
  [ProposalState.NoState]: "info",
  [ProposalState.Queued]: "primary",
  [ProposalState.Succeeded]: "success",
};
