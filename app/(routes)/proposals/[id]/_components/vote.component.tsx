import { useAccount } from "wagmi";
import classNames from "classnames";
import { UserRejectedRequestError, formatUnits } from "viem";

import { Button, Card, ConnectButton, Loader } from "@/app/components/_shared";
import { ChevronIcon } from "@/app/components/_icons";
import BlockExplorerLink from "@/app/components/_shared/block-explorer-link/block-explorer-link.component";
import InactiveProposalStatusMessage from "@/app/components/inactive-proposal-status-message/inactive-proposal-status-message";

import { Proposal, ProposalState } from "@/app/graphql";
import { useChainState } from "@/app/providers/chainState.provider";
import useVoteReceipt from "@/app/hooks/useVoteReceipt";
import useCastVote from "@/app/hooks/useCastVote";
import WalletHelper from "@/app/helpers/wallet.helper";
import NumbersService from "@/app/helpers/numbers.service";
import ErrorHelper from "@/app/helpers/error.helper";
import { SuccessIcon } from "@/app/components/_icons/success-icon";

const VOTE_TYPES = {
  Against: 0,
  For: 1,
  Abstain: 2,
} as { [key: string]: number };

const REVERSE_VOTE_TYPE_MAP = {
  [VOTE_TYPES.For]: "For",
  [VOTE_TYPES.Against]: "Against",
  [VOTE_TYPES.Abstain]: "Abstain",
} as const;

export default function Vote({ proposal }: { proposal: Proposal }) {
  if (proposal && proposal.state === ProposalState.NoState) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <br />
          <Loader isCenter />
          <br />
        </div>
      </>
    );
  }

  return (
    <Card>
      {proposal.state === ProposalState.Active ? (
        <CastVote proposalId={proposal.proposalId} />
      ) : (
        <InactiveProposalStatusMessage proposalState={proposal.state} />
      )}
    </Card>
  );
}

const CastVote = ({ proposalId }: { proposalId: Proposal["proposalId"] }) => {
  const { address, isConnected, isConnecting } = useAccount();

  const tokens = useChainState((s) => s.tokens);
  const chainStateReady = useChainState((s) => s.ready);
  const { data: voteReceipt, isLoading: isHasVotedStatusLoading } =
    useVoteReceipt({
      proposalId,
      address,
    });

  const vote = useCastVote();

  const hasEnoughLockedMentoToVote = tokens.veMento.balance > 0;

  const handleCastVote = (voteType: number) => {
    try {
      vote.castVote(proposalId, voteType);
    } catch (error) {
      // TODO: sentrify me
      console.log(error);
    }
  };

  if (
    isConnecting ||
    (isConnected && !chainStateReady) ||
    isHasVotedStatusLoading
  ) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <br />
          <Loader isCenter />
          <br />
        </div>
      </>
    );
  }

  if (!isConnected) {
    return <Disconnected />;
  }

  if (voteReceipt && voteReceipt.hasVoted) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col min-h-[163px] justify-between text-[22px] leading-[22px] font-fg">
          <div className="flex-grow" />
          <div>
            <span>{`You already voted `}</span>
            <VoteTypePill voteType={voteReceipt.support} />
            <span>{` on this proposal`}</span>
          </div>
          <div className="h-x4" />
          <span>Thank you for participating in the Mento ecosystem!</span>
          <div className="flex-grow" />
        </div>
      </>
    );
  }

  if (!hasEnoughLockedMentoToVote) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x5">
          <LockedBalance />
          <span>You need to lock your MENTO to vote</span>
          <Button href="/my-voting-power" theme="primary">
            Lock Mento <ChevronIcon direction="right" />
          </Button>
        </div>
      </>
    );
  }

  if (vote.isAwaitingUserSignature) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <span className="text-md">Confirm your vote</span>
          <Loader isCenter />
          <>
            {vote?.variables?.args && (
              <div className="flex flex-col items-center justify-center text-[0.875rem] gap-1">
                <div className="flex items-center justify-center gap-1">
                  <span>{`Voting `}</span>
                  <span className="flex items-center justify-center">
                    <VoteTypePill
                      voteType={vote?.variables?.args?.[1] as number}
                    />
                  </span>
                  <span>on</span>
                </div>
                <div>
                  <span>Proposal </span>
                  <span className="font-semibold">{`${WalletHelper.getShortAddress(proposalId)}`}</span>
                </div>
              </div>
            )}
          </>
          <span className="text-[#A8A8A8] text-sm dark:text-[#AAB3B6]">
            Proceed in your wallet
          </span>
        </div>
      </>
    );
  }

  if (vote.isConfirming) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <span className="text-md">Vote submitted</span>
          <SuccessIcon className="w-20 h-20 mx-auto" />
          <span className="text-[#A8A8A8] dark:text-[#AAB3B6] text-sm">
            Your vote is being processed
          </span>
          {vote.hash && (
            <BlockExplorerLink type="tx" item={vote.hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </>
    );
  }

  if (vote.isConfirmed) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <span className="text-md">Vote success</span>
          <SuccessIcon className="w-20 h-20 mx-auto" />
          {vote.hash && (
            <BlockExplorerLink type="tx" item={vote.hash}>
              View on explorer
            </BlockExplorerLink>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <VotingCardTitle />
      <div className="flex flex-col gap-x5 mt-x3">
        <LockedBalance />
        <div className="flex flex-col gap-2">
          <VotingButtons onSubmit={handleCastVote} />
          {vote.error && !(vote.error instanceof UserRejectedRequestError) ? (
            <div className="text-light-red flex flex-col gap-1 items-center justify-center text-sm w-full">
              <span>Error casting vote</span>
              <span>{ErrorHelper.processWagmiErrorMessage(vote.error)}</span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

const VotingButtons = ({
  onSubmit,
}: {
  onSubmit: (voteType: (typeof VOTE_TYPES)[keyof typeof VOTE_TYPES]) => void;
}) => {
  return (
    <div className="flex flex-col gap-x3">
      <Button theme="success" block onClick={() => onSubmit(VOTE_TYPES.For)}>
        For
      </Button>
      <Button
        type="submit"
        theme="danger"
        block
        onClick={() => onSubmit(VOTE_TYPES.Against)}
      >
        Against
      </Button>
      <Button
        type="submit"
        theme="tertiary"
        block
        onClick={() => onSubmit(VOTE_TYPES.Abstain)}
      >
        Abstain
      </Button>
    </div>
  );
};

const Disconnected = () => {
  return (
    <div className="flex flex-col gap-[25px] ">
      <VotingCardTitle />
      <span>Please connect your wallet to vote</span>
      <ConnectButton block theme="primary" />
    </div>
  );
};

const LockedBalance = () => {
  const tokens = useChainState((s) => s.tokens);
  return (
    <div className="flex flex-col gap-x2 items-center font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] animate-[pulse] leading-[2rem]">{`${NumbersService.parseNumericValue(formatUnits(tokens.veMento.balance, tokens.veMento.decimals))} veMENTO`}</div>
    </div>
  );
};

const VotingCardTitle = ({
  children = "Cast Votes",
}: React.PropsWithChildren) => {
  return (
    <Card.Header className="text-center">
      <h2 className="text-[2rem] leading-[2rem] font-fg font-medium">
        {children}
      </h2>
    </Card.Header>
  );
};

const VoteTypePill = ({ voteType }: { voteType: number }) => {
  return (
    <span
      className={classNames(
        "inline-flex justify-center items-center text-black text-sm px-2 py-1 rounded-md border-[0.5px] border-black",
        { "bg-light-green": voteType === VOTE_TYPES.For },
        { "bg-light-red": voteType === VOTE_TYPES.Against },
        { "bg-white": voteType === VOTE_TYPES.Abstain },
      )}
    >
      {`${REVERSE_VOTE_TYPE_MAP[voteType]}`}
    </span>
  );
};
