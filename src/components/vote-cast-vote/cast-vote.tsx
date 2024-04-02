import { useAccount } from "wagmi";

import { UserRejectedRequestError } from "viem";

import { Button, Card } from "@/components/_shared";
import { ChevronIcon } from "@/components/_icons";
import BlockExplorerLink from "@/components/_shared/block-explorer-link/block-explorer-link.component";

import { Proposal } from "@/lib/graphql";

import ErrorHelper from "@/lib/helpers/error.helper";
import { SuccessIcon } from "@/components/_icons/success-icon";
import VotingCardTitle from "@/components/_shared/vote-voting-card-title/voting-card-title";
import DisconnectedState from "./disconnected-state";
import LoadingState from "@/components/_shared/vote-loading-state/vote-loading-state";
import VotingButtons from "./voting-buttons";
import LockedBalance from "./locked-balance";

import HasVoted from "./has-voted";
import VoteConfirmation from "./vote-confirmation";
import useTokens from "@/lib/contracts/useTokens";
import useCastVote from "@/lib/contracts/governor/useCastVote";
import useVoteReceipt from "@/lib/contracts/governor/useVoteReceipt";

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

const CastVote = ({ proposalId }: { proposalId: Proposal["proposalId"] }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { veMentoBalance } = useTokens();
  const { data: voteReceipt, isLoading: isHasVotedStatusLoading } =
    useVoteReceipt({
      proposalId,
      address,
    });

  const vote = useCastVote();

  const hasEnoughLockedMentoToVote = veMentoBalance.value > 0;
  const isInitializing = isConnecting || isHasVotedStatusLoading;

  const handleCastVote = (voteType: number) => {
    try {
      vote.castVote(proposalId, voteType);
    } catch (error) {
      // TODO: sentrify me
      console.log(error);
    }
  };

  if (isInitializing) {
    return <LoadingState />;
  }

  if (isDisconnected) {
    return <DisconnectedState />;
  }

  if (voteReceipt && voteReceipt.hasVoted) {
    return <HasVoted voteType={voteReceipt.support} />;
  }

  if (!hasEnoughLockedMentoToVote) {
    return <DirectToLockMento />;
  }

  if (vote.isAwaitingUserSignature) {
    return (
      <VoteConfirmation
        voteType={vote?.variables?.args?.[1] as number}
        proposalId={proposalId}
      />
    );
  }

  if (vote.isConfirming) {
    return (
      <Card>
        <VotingCardTitle />
        <div className="mt-x2 flex flex-col gap-x3 text-center">
          <span className="text-md">Vote submitted</span>
          <SuccessIcon className="mx-auto h-20 w-20" />
          <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
            Your vote is being processed
          </span>
          {vote.hash && (
            <BlockExplorerLink type="tx" item={vote.hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </Card>
    );
  }

  if (vote.isConfirmed) {
    return (
      <Card>
        <VotingCardTitle />
        <div className="mt-x2 flex flex-col gap-x3 text-center">
          <span className="text-md">Vote success</span>
          <SuccessIcon className="mx-auto h-20 w-20" />
          {vote.hash && (
            <BlockExplorerLink type="tx" item={vote.hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <VotingCardTitle />
      <div className="mt-x3 flex flex-col gap-x5">
        <LockedBalance />
        <div className="flex flex-col gap-2">
          <VotingButtons onSubmit={handleCastVote} />
          {vote.error && <VotingError error={vote.error} />}
        </div>
      </div>
    </Card>
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
    <Card>
      <VotingCardTitle />
      <div className="flex flex-col gap-x5">
        <LockedBalance />
        <span>You need to lock your MENTO to vote</span>
        <Button href="/my-voting-power" theme="primary">
          Lock Mento <ChevronIcon direction="right" />
        </Button>
      </div>
    </Card>
  );
};

export default CastVote;
