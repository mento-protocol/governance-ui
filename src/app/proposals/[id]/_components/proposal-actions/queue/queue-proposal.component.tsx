import * as Sentry from "@sentry/nextjs";

import { BlockExplorerLink, Button, Card, Loader } from "@/components/_shared";
import { SuccessIcon } from "@/components/_icons";

import type { Proposal } from "@/lib/graphql";

import { ProposalActionTitle } from "../proposal-action-title";
import useQueueProposal from "@/lib/contracts/governor/useQueueProposal";
import { ProposalActionError } from "../proposal-action-error";
import WalletHelper from "@/lib/helpers/wallet.helper";

export const QueueProposal = ({
  proposalId,
}: {
  proposalId: Proposal["proposalId"];
}) => {
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
      queueProposal(proposalId);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  if (isAwaitingUserSignature) {
    return <ProposalActionConfirmation proposalId={proposalId} />;
  }

  if (isConfirming) {
    return <QueueConfirming hash={hash} />;
  }

  if (isConfirmed) {
    return <QueueConfirmed hash={hash} />;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <Card.Header className="text-center">
        <ProposalActionTitle>Proposal succeeded</ProposalActionTitle>
      </Card.Header>
      <div className="flex flex-col gap-2">
        <span>
          This proposal has succeeded. It&apos;s now ready to be queued for
          execution.
        </span>
        <span>Queue this proposal to start the time lock period.</span>
      </div>
      <div>
        <Button className="mx-auto" onClick={handleQueueProposal}>
          Queue Proposal
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
      <ProposalActionTitle>Queue Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Confirm</span>
        <Loader
          isCenter
          className="w-[100%]"
          logoColor="fill-black dark:fill-mento-cyan"
        />
        <>
          <div className="flex flex-col items-center justify-center gap-1 text-[0.875rem]">
            <span>Queueing Proposal </span>
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

const QueueConfirmed = ({ hash }: { hash: `0x${string}` | undefined }) => {
  return (
    <>
      <ProposalActionTitle>Queue Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Proposal queued</span>
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

const QueueConfirming = ({ hash }: { hash: `0x${string}` | undefined }) => {
  return (
    <>
      <ProposalActionTitle>Queue Proposal</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Queueing Proposal</span>
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
