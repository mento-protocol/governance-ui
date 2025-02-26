"use client";
import * as Sentry from "@sentry/nextjs";

import { Button, CardHeader } from "@mento-protocol/ui-toolkit";
import type { Proposal } from "@/lib/graphql";

import { ProposalActionTitle } from "../proposal-action-title";
import useExecuteProposal from "@/lib/contracts/governor/useExecuteProposal";
import { ProposalActionError } from "../proposal-action-error";
import { useIsTimeLocked } from "./useIsTimeLocked";
import {
  ProposalActionConfirming,
  ProposalActionConfirmed,
} from "../proposal-action-status";
import { ProposalActionConfirmation } from "../proposal-action-confirmation.component";

export const ExecuteProposal = ({ proposal }: { proposal: Proposal }) => {
  const isTimeLocked = useIsTimeLocked(proposal);
  const {
    hash,
    executeProposal,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    error,
  } = useExecuteProposal();

  const handleExecuteProposal = () => {
    try {
      executeProposal(proposal.proposalId);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  if (isAwaitingUserSignature) {
    return (
      <ProposalActionConfirmation
        title="Execute Proposal"
        subtitle="Executing Proposal"
        proposalId={proposal.proposalId}
      />
    );
  }

  if (isConfirming) {
    return (
      <ProposalActionConfirming
        title="Execute Proposal"
        status="Executing Proposal"
        hash={hash}
      />
    );
  }

  if (isConfirmed) {
    return (
      <ProposalActionConfirmed
        title="Execute Proposal"
        status="Proposal executed"
        hash={hash}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <CardHeader className="text-center">
        <ProposalActionTitle>
          {isTimeLocked ? "Proposal queued" : "Proposal ready for execution"}
        </ProposalActionTitle>
      </CardHeader>
      <div className="flex flex-col gap-2">
        {isTimeLocked ? (
          <>
            <span>
              This proposal is currently in a mandatory waiting period for
              security reasons.
            </span>
            <span>
              It will be ready for execution soon. Please check back later.
            </span>
          </>
        ) : (
          <>
            <span>
              The waiting period for this proposal has ended. It&apos;s now
              ready to be executed.
            </span>
            <span>Execute this proposal to implement its changes.</span>
          </>
        )}
      </div>
      <div>
        <Button
          fullwidth
          onClick={handleExecuteProposal}
          disabled={isTimeLocked}
        >
          {isTimeLocked ? "Waiting period in progress" : "Execute Proposal"}
        </Button>
        {error && (
          <ProposalActionError
            errorHeading="Error executing proposal"
            error={error}
          />
        )}
      </div>
    </div>
  );
};
