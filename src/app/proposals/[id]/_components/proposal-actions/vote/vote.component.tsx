import { useAccount } from "wagmi";
import { UserRejectedRequestError } from "viem";
import * as Sentry from "@sentry/nextjs";

import { BlockExplorerLink } from "@/components/_shared";
import { Button, ChevronIcon, SuccessIcon } from "@mento-protocol/ui-toolkit";

import type { Proposal } from "@/lib/graphql";

import ErrorHelper from "@/lib/helpers/error.helper";
import useTokens from "@/lib/contracts/useTokens";
import useCastVote from "@/lib/contracts/governor/useCastVote";
import useVoteReceipt from "@/lib/contracts/governor/useVoteReceipt";

import { VotingButtons } from "./voting-buttons";
import { LockedBalance } from "./locked-balance";

import { HasVoted } from "./has-voted";
import { VoteConfirmation } from "./vote-confirmation";
import { ProposalActionTitle } from "../proposal-action-title";
import { ProposalActionLoading } from "../proposal-action-loading";

export const VOTE_TYPES = {
  Against: 0,
  For: 1,
  Abstain: 2,
} as { [key: string]: number };

export const REVERSE_VOTE_TYPE_MAP = {
  [VOTE_TYPES.For]: "For",
  [VOTE_TYPES.Against]: "Against",
  [VOTE_TYPES.Abstain]: "Abstain",
} as const;

export const Vote = ({ proposal }: { proposal: Proposal }) => {
  const { address, isConnecting } = useAccount();
  const { veMentoBalance } = useTokens();
  const { data: voteReceipt, isLoading: isHasVotedStatusLoading } =
    useVoteReceipt({
      proposalId: proposal.proposalId,
      address,
    });

  const {
    hash,
    castVote,
    variables,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    error,
  } = useCastVote();

  const hasEnoughLockedMentoToVote = veMentoBalance.value > 0;
  const isInitializing = isConnecting || isHasVotedStatusLoading;

  const handleVote = (support: number) => {
    try {
      castVote(proposal.proposalId, support);
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  if (isInitializing) {
    return <ProposalActionLoading />;
  }

  if (voteReceipt && voteReceipt.hasVoted) {
    return <HasVoted voteType={voteReceipt.support} />;
  }

  if (!hasEnoughLockedMentoToVote) {
    return <DirectToLockMento />;
  }

  if (isAwaitingUserSignature) {
    return (
      <VoteConfirmation
        voteType={variables?.args?.[1] as number}
        proposalId={proposal.proposalId}
      />
    );
  }

  if (isConfirming) {
    return (
      <>
        <ProposalActionTitle />
        <div className="mt-x2 flex flex-col gap-x3 text-center">
          <span className="text-md">Vote submitted</span>
          <SuccessIcon className="mx-auto h-20 w-20" />
          <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
            Your vote is being processed
          </span>
          {hash && (
            <BlockExplorerLink type="tx" item={hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </>
    );
  }

  if (isConfirmed) {
    return (
      <>
        <ProposalActionTitle />
        <div className="mt-x2 flex flex-col gap-x3 text-center">
          <span className="text-md">Vote success</span>
          <SuccessIcon className="mx-auto h-20 w-20" />
          {hash && (
            <BlockExplorerLink type="tx" item={hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <ProposalActionTitle />
      <div className="mt-x3 flex flex-col gap-x5">
        <LockedBalance />
        <div className="flex flex-col gap-2">
          <VotingButtons onSubmit={handleVote} />
          {error && <VotingError error={error} />}
        </div>
      </div>
    </>
  );
};

const VotingError = ({ error }: { error: Error }) => {
  if (error instanceof UserRejectedRequestError) {
    return null;
  }
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1 text-sm text-light-red">
      <span>Error casting vote</span>
      <span>{ErrorHelper.processWagmiErrorMessage(error)}</span>
    </div>
  );
};

const DirectToLockMento = () => {
  return (
    <>
      <ProposalActionTitle />
      <div className="flex flex-col gap-x5 text-center">
        <LockedBalance />
        <span>You need to lock your MENTO to vote</span>
        <Button fullwidth href="/voting-power" theme="primary">
          Lock Mento <ChevronIcon direction="right" />
        </Button>
      </div>
    </>
  );
};
