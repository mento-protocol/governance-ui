import { Participant } from "@/app/graphql";
import type { Votes } from "@/app/types";
import { Avatar } from "@components/_shared";
import { WalletAddress } from "@components/wallet-address/wallet-address.component";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import type { IVoteType } from "@interfaces/vote.interface";
import classNames from "classnames";
import { formatUnits } from "viem";
import styles from "./votes-list.module.scss";

interface VotesListProps extends BaseComponentProps {
  voteType: IVoteType;
  votes: Votes;
}

export const VotesList = ({
  votes,
  voteType,
  className,
  style,
}: VotesListProps) => {
  return (
    <div className={classNames(styles.list, className)} style={style}>
      <div className={styles.header}>
        <div>{votes[voteType].participants.length} Addresses</div>
        <div>{formatUnits(votes[voteType].total, 18)} Votes</div>
      </div>
      {votes[voteType].participants.map((participant: Participant, index) => (
        <div key={index} className={styles.vote}>
          <div>
            <Avatar address={participant.address} />
            <WalletAddress address={participant.address} />
          </div>
          <div>{getParticipantPercentage(participant, votes.total)}</div>
        </div>
      ))}
    </div>
  );
};

const getParticipantPercentage = (
  participant: Participant,
  totalVotes: bigint,
) => {
  if (totalVotes > BigInt(0)) {
    return `${Number((participant.weight / totalVotes) * BigInt(100)).toFixed(2)}%`;
  } else return "0%";
};
