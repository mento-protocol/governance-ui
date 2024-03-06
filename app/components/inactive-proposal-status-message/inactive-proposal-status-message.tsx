import { ProposalState } from "@/app/graphql";
import React from "react";
import { Card } from "../_shared";

const exploreLaterMessage =
  "Please explore other proposals to participate in the Mento ecosystem!";

const INACTIVE_PROPOSAL_MESSAGE_MAP: Record<
  Exclude<ProposalState, ProposalState.Active>,
  { header: string; statusMessage: string; statusDetail: string }
> = {
  [ProposalState.Succeeded]: {
    header: "Proposal Succeeded",
    statusMessage: "This proposal has succeeded",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.Defeated]: {
    header: "Proposal Defeated",
    statusMessage: "This proposal was defeated.",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.Pending]: {
    header: "Proposal Pending",
    statusMessage: "This proposal is currently pending.",
    statusDetail: "Please return later to participate in the Mento ecosystem!",
  },
  [ProposalState.Canceled]: {
    header: "Proposal Canceled",
    statusMessage: "This proposal was canceled.",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.Executed]: {
    header: "Proposal Executed",
    statusMessage: "This proposal was executed.",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.Expired]: {
    header: "Proposal Expired",
    statusMessage: "This proposal has expired.",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.Queued]: {
    header: "Proposal Queued",
    statusMessage: "This proposal is queued.",
    statusDetail: exploreLaterMessage,
  },
  [ProposalState.NoState]: {
    header: "Proposal Pending",
    statusMessage: "This proposal is currently pending.",
    statusDetail: exploreLaterMessage,
  },
};

const InactiveProposalStatusMessage = ({
  proposalState,
}: {
  proposalState: Exclude<ProposalState, ProposalState.Active>;
}) => {
  return (
    <>
      <Card.Header className="text-center">
        <h2 className="text-[2rem] leading-[2rem] font-fg font-medium">
          {INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].header}
        </h2>
      </Card.Header>
      <div className="flex flex-col min-h-[163px] justify-between text-[22px] leading-[22px] font-fg">
        <div className="flex-grow" />
        <span>
          {INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].statusMessage}
        </span>
        <div className="h-x4" />
        <span>{INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].statusDetail}</span>
        <div className="flex-grow" />
      </div>
    </>
  );
};

export default InactiveProposalStatusMessage;
