import { BadgeType } from "@/app/types";
import { ProposalState } from "@/app/graphql";

export default interface IListProposal {
  id: string;
  title: string;
  description: string;
  state: ProposalState;
  votesTotal: number;
  votesYes: number;
  votesNo: number;
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
