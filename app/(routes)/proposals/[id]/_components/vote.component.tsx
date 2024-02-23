import { Button, Card, ConnectButton } from "@/app/components/_shared";
import type { IVoteType } from "@/app/interfaces/vote.interface";
import useModal from "@/app/providers/modal.provider";
import classNames from "classnames";
import styles from "../page.module.scss";
import { useAccount } from "wagmi";
import { Proposal, ProposalState } from "@/app/graphql";

type Props = {
  balanceVeMENTO: number;
  setVotingModalActive: (active: boolean) => void;
  votingModalActive: boolean;
  proposal: Proposal;
};

export default function Vote({
  balanceVeMENTO,
  setVotingModalActive,
  votingModalActive,
  proposal,
}: Props) {
  const { isConnected } = useAccount();
  const proposalState = proposal.state;
  return (
    <div
      className={classNames(
        styles.backdrop,
        votingModalActive && styles.opened,
        "mb-5",
      )}
    >
      <Card
        className={classNames(
          styles.proposal_addon,
          votingModalActive && styles.opened,
        )}
      >
        {proposalState === ProposalState.Active ? (
          <>
            <Card.Header className="text-center">
              <h2 className="text-[2rem] leading-[2rem] font-medium">
                Cast votes
              </h2>
            </Card.Header>
            <div className="flex flex-col gap-x5 mt-x5">
              {isConnected ? (
                <>
                  <LockedBalance balanceVeMENTO={balanceVeMENTO} />
                  <VotingButtons balanceVeMENTO={balanceVeMENTO} />
                </>
              ) : (
                <Disconnected />
              )}
            </div>{" "}
          </>
        ) : (
          <InactiveProposalStatusMessage proposalState={proposalState} />
        )}
      </Card>
    </div>
  );
}

const InactiveProposalStatusMessage = ({
  proposalState,
}: {
  proposalState: Exclude<ProposalState, ProposalState.Active>;
}) => {
  const exploreLaterMessage =
    "Please explore other proposals to participate in the Mento ecosystem!";
  const messagesMap: Record<
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
      header: "Proposal pending",
      statusMessage: "This proposal is currently pending.",
      statusDetail: "Please return later to participate in Mento ecosystem!",
    },
  };
  return (
    <>
      <Card.Header className="text-center">
        <h2 className="text-[2rem] leading-[2rem] font-medium">
          {messagesMap[proposalState].header}
        </h2>
      </Card.Header>
      <div className="flex flex-col min-h-[163px] justify-between text-[22px] leading-[22px]">
        <div className="flex-grow" />
        <span> {messagesMap[proposalState].statusMessage}</span>
        <div className="h-x4" />
        <span> {messagesMap[proposalState].statusDetail}</span>
        <div className="flex-grow" />
      </div>
    </>
  );
};

const LockedBalance = ({ balanceVeMENTO }: { balanceVeMENTO: number }) => {
  return (
    <div className="flex flex-col gap-x3 items-center">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] leading-[rem]">{`${balanceVeMENTO} veMENTO`}</div>
    </div>
  );
};

const VotingButtons = ({ balanceVeMENTO }: { balanceVeMENTO: number }) => {
  const { showConfirm } = useModal();
  const onSubmit = (voteType: IVoteType) => {
    showConfirm(`Are you sure you want to vote with ${balanceVeMENTO} power?`, {
      modalType: voteTypeToModalType(voteType),
    }).then((result) => {
      if (result) {
        // TODO: Trigger real vote tx here
        // vote(voteType, balanceVeMENTO, walletAddress || "");
      }
    });
  };
  return (
    <div className="flex flex-col gap-x3">
      <Button theme="success" block onClick={() => onSubmit("for")}>
        For
      </Button>
      <Button
        type="submit"
        theme="danger"
        block
        onClick={() => onSubmit("against")}
      >
        Against
      </Button>
      <Button
        type="submit"
        theme="tertiary"
        block
        onClick={() => onSubmit("abstain")}
      >
        Abstain
      </Button>
    </div>
  );
};

const Disconnected = () => {
  return (
    <div className="flex flex-col gap-[25px] ">
      <span>Please connect your wallet to participate in the voting.</span>
      <ConnectButton block theme="primary" />
    </div>
  );
};

const voteTypeToModalType = (voteType: IVoteType) => {
  switch (voteType) {
    case "for":
      return "success";
    case "against":
      return "error";
    case "abstain":
    default:
      return "info";
  }
};
