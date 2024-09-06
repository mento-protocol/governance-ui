import { ProposalState } from "@/lib/graphql";
import React from "react";
import { Card } from "@/components/_shared";

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

export const ProposalStatusMessage = ({
  proposalState,
}: {
  proposalState: Exclude<ProposalState, ProposalState.Active>;
}) => {
  return (
    <Card className="min-h-[260px] p-4">
      <Card.Header className="text-center">
        <h2 className="font-fg text-[32px]/none font-medium">
          {INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].header}
        </h2>
      </Card.Header>
      <div className="flex min-h-[163px] flex-col justify-between font-fg text-[22px]/none">
        <div className="flex-grow" />
        <span>
          {INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].statusMessage}
        </span>
        <div className="h-x4" />
        <span>{INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].statusDetail}</span>
        <div className="flex-grow" />
      </div>
    </Card>
  );
};
