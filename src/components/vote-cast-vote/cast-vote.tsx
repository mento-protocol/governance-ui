import { useAccount } from "wagmi";

import { UserRejectedRequestError } from "viem";

import {
  BlockExplorerLink,
  Button,
  Card,
  LoadingState,
  VotingCardTitle,
} from "@/components/_shared";
import { ChevronIcon, SuccessIcon } from "@/components/_icons";

import { Proposal } from "@/lib/graphql";

import ErrorHelper from "@/lib/helpers/error.helper";
import { DisconnectedState } from "./disconnected-state";
import { VotingButtons } from "./voting-buttons";
import { LockedBalance } from "./locked-balance";

import { HasVoted } from "./has-voted";
import { VoteConfirmation } from "./vote-confirmation";
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

export const CastVote = ({
  proposalId,
}: {
  proposalId: Proposal["proposalId"];
}) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { veMentoBalance } = useTokens();
  const { data: voteReceipt, isLoading: isHasVotedStatusLoading } =
    useVoteReceipt({
      proposalId,
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

  const handleCastVote = (voteType: number) => {
    try {
      castVote(proposalId, voteType);
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

  if (isAwaitingUserSignature) {
    return (
      <VoteConfirmation
        voteType={variables?.args?.[1] as number}
        proposalId={proposalId}
      />
    );
  }

  if (isConfirming) {
    return (
      <Card className="min-h-[260px] p-4">
        <VotingCardTitle />
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
      </Card>
    );
  }

  if (isConfirmed) {
    return (
      <Card className="min-h-[260px] p-4">
        <VotingCardTitle />
        <div className="mt-x2 flex flex-col gap-x3 text-center">
          <span className="text-md">Vote success</span>
          <SuccessIcon className="mx-auto h-20 w-20" />
          {hash && (
            <BlockExplorerLink type="tx" item={hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="min-h-[260px] p-4">
      <VotingCardTitle />
      <div className="mt-x3 flex flex-col gap-x5">
        <LockedBalance />
        <div className="flex flex-col gap-2">
          <VotingButtons onSubmit={handleCastVote} />
          {error && <VotingError error={error} />}
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
    <Card className="min-h-[260px] p-4">
      <VotingCardTitle />
      <div className="flex flex-col gap-x5 text-center">
        <LockedBalance />
        <span>You need to lock your MENTO to vote</span>
        <Button fullwidth href="/voting-power" theme="primary">
          Lock Mento <ChevronIcon direction="right" />
        </Button>
      </div>
    </Card>
  );
};
