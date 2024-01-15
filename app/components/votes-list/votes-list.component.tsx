import styles from "./votes-list.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { IVoteType } from "@interfaces/vote.interface";
import classNames from "classnames";
import { Avatar, Loader } from "@components/_shared";
import { WalletAddress } from "@components/wallet-address/wallet-address.component";
import { useProposalDetailsStore } from "@/app/store";

interface VotesListProps extends BaseComponentProps {
  voteType: IVoteType;
}

export const VotesList = ({ voteType, className, style }: VotesListProps) => {
  const { votes, isFetching, fetch } = useProposalDetailsStore();

  const voters = new Set(...votes[voteType].map((item) => item.address)).size;
  const totalVotes = votes[voteType].reduce((acc, vote) => acc + vote.votes, 0);

  if (isFetching) {
    return <Loader isCenter />;
  }

  return (
    <div className={classNames(styles.list, className)} style={style}>
      <div className={styles.header}>
        <div>{voters} Addresses</div>
        <div>{totalVotes} Votes</div>
      </div>
      {votes[voteType].map((vote, index) => (
        <div key={index} className={styles.vote}>
          <div>
            <Avatar address={vote.address} />
            <WalletAddress address={vote.address} />
          </div>
          <div>{((vote.votes / totalVotes) * 100).toFixed(2)}%</div>
        </div>
      ))}
    </div>
  );
};
