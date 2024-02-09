import { Button, Card } from "@/app/components/_shared";
import type { IVoteType } from "@/app/interfaces/vote.interface";
import useModal from "@/app/providers/modal.provider";
import classNames from "classnames";
import styles from "../page.module.scss";

type Props = {
  balanceVeMENTO: number;
  setVotingModalActive: (active: boolean) => void;
  votingModalActive: boolean;
  walletAddress: string | undefined;
};

export default function Vote({
  balanceVeMENTO,
  setVotingModalActive,
  votingModalActive,
  walletAddress,
}: Props) {
  const { showConfirm } = useModal();
  const onSubmit = (voteType: IVoteType) => {
    showConfirm(`Are you sure you want to vote with ${balanceVeMENTO} power?`, {
      modalType: voteTypeToModalType(voteType),
    }).then((result) => {
      if (result) {
        // TODO: Trigger vote tx here
        // vote(voteType, balanceVeMENTO, walletAddress || "");
      }
    });
  };

  return (
    <div
      className={classNames(
        styles.backdrop,
        votingModalActive && styles.opened,
      )}
    >
      <Card
        className={classNames(
          styles.proposal_addon,
          votingModalActive && styles.opened,
          !walletAddress && "!opacity-60",
        )}
      >
        <Card.Header className="text-center">
          <h2 className={styles.votes_title}>Cast votes</h2>
          <button
            className={styles.proposal_addon__close}
            onClick={() => setVotingModalActive(false)}
          >
            X
          </button>
        </Card.Header>
        <div className="flex flex-col gap-1 ">
          <div className={styles.addon}>
            <div className="flex justify-center">
              {!!walletAddress ? (
                <div className={styles.power}>
                  <div className={styles.power__title}>Your voting power</div>
                  <div className={styles.power__value}>
                    {balanceVeMENTO} veMENTO
                  </div>
                </div>
              ) : (
                <div className="underline">Please connect wallet</div>
              )}
            </div>
          </div>
          <Button
            className={styles.button_wrapper}
            disabled={!walletAddress}
            theme="success"
            block
            onClick={() => onSubmit("for")}
          >
            For
          </Button>
          <Button
            className={styles.button_wrapper}
            disabled={!walletAddress}
            type="submit"
            theme="danger"
            block
            onClick={() => onSubmit("against")}
          >
            Against
          </Button>
          <Button
            className={styles.button_wrapper}
            disabled={!walletAddress}
            type="submit"
            theme="tertiary"
            block
            onClick={() => onSubmit("abstain")}
          >
            Abstain
          </Button>
        </div>
      </Card>
    </div>
  );
}

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
