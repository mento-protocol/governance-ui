import { Button, Card, ConnectButton } from "@/app/components/_shared";
import { useAccount, useReadContract } from "wagmi";
import { Proposal, ProposalState } from "@/app/graphql";
import { useUserStore } from "@/app/store";
import { ChevronIcon } from "@/app/components/_icons";
import BlockExplorerLink from "@/app/components/_shared/block-explorer-link/block-explorer-link.component";
import useVoteReceipt from "@/app/hooks/useVoteReceipt";
import useCastVote from "@/app/hooks/useCastVote";
import MentoLoadingSpinner from "@/app/components/_shared/mento-loading-spinner";
import exports from "@styles/exports.module.scss";
import { SVGProps } from "react";
import { Address, BaseError, erc20Abi } from "viem";
import { useContracts } from "@/app/hooks/useContracts";
import WalletHelper from "@/app/helpers/wallet.helper";
import classNames from "classnames";

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
    statusDetail: "Please return later to participate in Mento ecosystem!",
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

const voteTypeMap: Record<
  number,
  {
    message: keyof typeof VoteTypes;
    buttonType: string;
  }
> = {
  1: { message: "For", buttonType: "bg-light-green" },
  0: {
    message: "Against",
    buttonType: "bg-light-red",
  },
  2: { message: "Abstain", buttonType: "bg-white" },
};

export default function Vote({ proposal }: { proposal: Proposal }) {
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

const InactiveProposalStatusMessage = ({
  proposalState,
}: {
  proposalState: Exclude<ProposalState, ProposalState.Active>;
}) => {
  return (
    <>
      <VotingCardTitle>
        {INACTIVE_PROPOSAL_MESSAGE_MAP[proposalState].header}
      </VotingCardTitle>
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

const CastVote = ({ proposalId }: { proposalId: Proposal["proposalId"] }) => {
  const { address, isConnected, isConnecting } = useAccount();

  const { balanceVeMENTO, isReady } = useUserStore();
  const {
    data: voteReceipt,
    error,
    isError,
  } = useVoteReceipt({ proposalId, address });

  const vote = useCastVote();

  const hasEnoughLockedMentoToVote = balanceVeMENTO
    ? balanceVeMENTO > 0
    : false;

  const handleCastVote = (voteType: number) => {
    try {
      vote.castVote(proposalId, voteType);
    } catch (error) {
      console.log(error);
    }
  };

  if (isConnecting || !isReady) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <br />
          <MentoLoadingSpinner />
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
          <span>{`You have already voted "${voteTypeMap[voteReceipt.support].message}" on this proposal`}</span>
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
        <LockedBalance />
        <span>You should lock your MENTO to vote</span>
        <Button href="/my-voting-power" theme="primary">
          Lock Mento <ChevronIcon direction="right" />
        </Button>
      </>
    );
  }

  if (vote.isAwaitingUserSignature) {
    return (
      <>
        <VotingCardTitle />
        <div className="flex flex-col gap-x3 mt-x2 text-center">
          <span className="text-md">Confirm your vote</span>
          <MentoLoadingSpinner />
          <>
            {vote?.variables?.args && (
              <div className="flex flex-col items-center justify-center text-[0.875rem] gap-1">
                <div className="flex items-center justify-center gap-1">
                  <span>{`Voting `}</span>
                  <span className="flex items-center justify-center">
                    <span
                      className={classNames(
                        "flex justify-center items-center text-black text-sm px-2 py-1 rounded-md border-[0.5px] border-black",
                        voteTypeMap[Number(vote?.variables?.args?.[1])]
                          .buttonType,
                      )}
                    >
                      {`${voteTypeMap[Number(vote?.variables?.args?.[1])].message}`}
                    </span>
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
            <BlockExplorerLink
              type="tx"
              className="text-primary-blue text-sm"
              item={vote.hash}
            >
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
        <div className="flex flex-col gap-1">
          <VotingButtons onSubmit={handleCastVote} />
          {vote.error && (
            <div className="text-light-red flex flex-col gap-1 item-center justify-center text-sm w-full">
              <span>Error casting vote</span>
              <span>
                {(vote.error as BaseError).shortMessage || vote?.error?.message}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const VoteTypes = {
  Against: 0,
  For: 1,
  Abstain: 2,
} as const;

type VoteType = (typeof VoteTypes)[keyof typeof VoteTypes];

const VotingButtons = ({
  onSubmit,
}: {
  onSubmit: (voteType: VoteType) => void;
}) => {
  return (
    <div className="flex flex-col gap-x3">
      <Button theme="success" block onClick={() => onSubmit(VoteTypes.For)}>
        For
      </Button>
      <Button
        type="submit"
        theme="danger"
        block
        onClick={() => onSubmit(VoteTypes.Against)}
      >
        Against
      </Button>
      <Button
        type="submit"
        theme="tertiary"
        block
        onClick={() => onSubmit(VoteTypes.Abstain)}
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
      <span>Please connect your wallet to participate in the voting.</span>
      <ConnectButton block theme="primary" />
    </div>
  );
};

const LockedBalance = () => {
  const { balanceVeMENTO } = useUserStore();
  return (
    <div className="flex flex-col gap-x2 items-center font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] leading-[2rem]">{`${balanceVeMENTO} veMENTO`}</div>
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

export const SuccessIcon = ({
  bgColor = exports.success,
  checkColor = exports.black,
  ...props
}: {
  bgColor?: string;
  checkColor?: string;
} & SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" {...props}>
    <circle cx="26" cy="26" r="25" fill={bgColor} />
    <path
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
      fill="none"
      stroke={checkColor}
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  </svg>
);

const useBalanceVeMENTO = ({ address }: { address?: Address }) => {
  const contracts = useContracts();
  const lockedMentoRead = useReadContract({
    abi: erc20Abi,
    address: contracts.Locking.address,
    functionName: "balanceOf",
    args: [address!],
    query: { enabled: !!address, staleTime: 10000 },
    scopeKey: "balanceVeMENTO",
  });
  console.log({ lockedMentoRead });
  return { balanceVeMENTO: lockedMentoRead.data, ...lockedMentoRead };
};
