"use client";
import * as Sentry from "@sentry/nextjs";

import { Button, CardHeader } from "@mento-protocol/ui-toolkit";

import type { Proposal } from "@/lib/graphql";

import { ProposalActionTitle } from "../proposal-action-title";
import useQueueProposal from "@/lib/contracts/governor/useQueueProposal";
import { ProposalActionError } from "../proposal-action-error";
import { ProposalActionConfirmation } from "../proposal-action-confirmation.component";
import {
  ProposalActionConfirmed,
  ProposalActionConfirming,
} from "../proposal-action-status";

export const QueueProposal = ({ proposal }: { proposal: Proposal }) => {
  const {
    hash,
    queueProposal,

    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    error,
  } = useQueueProposal();

  const handleQueueProposal = () => {
    try {
      queueProposal(proposal.proposalId);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  if (isAwaitingUserSignature) {
    return (
      <ProposalActionConfirmation
        title="Queue Proposal"
        subtitle="Queueing Proposal"
        proposalId={proposal.proposalId}
      />
    );
  }

  if (isConfirming) {
    return (
      <ProposalActionConfirming
        title="Queue Proposal"
        status="Queueing Proposal"
        hash={hash}
      />
    );
  }

  if (isConfirmed) {
    return (
      <ProposalActionConfirmed
        title="Queue Proposal"
        status="Proposal queued"
        hash={hash}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <CardHeader className="text-center">
        <ProposalActionTitle>Proposal succeeded</ProposalActionTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        <span>
          This proposal has succeeded. It&apos;s now ready to be queued for
          execution.
        </span>
        <span>Queue this proposal to start the time lock period.</span>
      </div>
      <div>
        <Button fullwidth onClick={handleQueueProposal}>
          Queue Proposal
        </Button>
        {error && (
          <ProposalActionError
            errorHeading="Error queuing proposal"
            error={error}
          />
        )}
      </div>
    </div>
  );
};
