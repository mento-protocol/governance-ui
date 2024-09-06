import * as Sentry from "@sentry/nextjs";

import { BlockExplorerLink, Button, Card, Loader } from "@/components/_shared";
import { SuccessIcon } from "@/components/_icons";

import type { Proposal } from "@/lib/graphql";

import { ProposalActionTitle } from "../proposal-action-title";
import useExecuteProposal from "@/lib/contracts/governor/useExecuteProposal";
import { ProposalActionError } from "../proposal-action-error";
import WalletHelper from "@/lib/helpers/wallet.helper";
import { useIsTimeLocked } from "./useIsTimeLocked";

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
    return <ProposalActionConfirmation proposalId={proposal.proposalId} />;
  }

  if (isConfirming) {
    return <ExecuteConfirming hash={hash} />;
  }

  if (isConfirmed) {
    return <ExecuteConfirmed hash={hash} />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <Card.Header className="text-center">
        <ProposalActionTitle>
          {isTimeLocked ? "Proposal queued" : "Proposal ready for execution"}
        </ProposalActionTitle>
      </Card.Header>
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
          className="mx-auto"
          onClick={handleExecuteProposal}
          disabled={isTimeLocked}
        >
          {isTimeLocked ? "Waiting period in progress" : "Execute Proposal"}
        </Button>
        {error && <ProposalActionError error={error} />}
      </div>
    </div>
  );
};

const ProposalActionConfirmation = ({
  proposalId,
}: {
  proposalId: Proposal["proposalId"];
}) => {
  return (
    <>
      <ProposalActionTitle>Execute Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Confirm</span>
        <Loader
          isCenter
          className="w-[100%]"
          logoColor="fill-black dark:fill-mento-cyan"
        />
        <>
          <div className="flex flex-col items-center justify-center gap-1 text-[0.875rem]">
            <span>Executing Proposal </span>
            <span className="font-semibold">{`${WalletHelper.getShortAddress(proposalId)}`}</span>
          </div>
        </>
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Proceed in your wallet
        </span>
      </div>
    </>
  );
};

const ExecuteConfirmed = ({ hash }: { hash: `0x${string}` | undefined }) => {
  return (
    <>
      <ProposalActionTitle>Execute Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Proposal executed</span>
        <SuccessIcon className="mx-auto h-20 w-20" />
        {hash && (
          <BlockExplorerLink type="tx" item={hash}>
            View on explorer
          </BlockExplorerLink>
        )}
      </div>
    </>
  );
};

const ExecuteConfirming = ({ hash }: { hash: `0x${string}` | undefined }) => {
  return (
    <>
      <ProposalActionTitle>Execute Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Executing Proposal</span>
        <SuccessIcon className="mx-auto h-20 w-20" />
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Processing transaction. This may take a few moments.
        </span>
        {hash && (
          <BlockExplorerLink type="tx" item={hash}>
            View on explorer
          </BlockExplorerLink>
        )}
      </div>
    </>
  );
};
