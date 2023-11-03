import styles from './votes-list.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {VoteType} from "@interfaces/vote";
import classNames from "classnames";
import {votesMock} from "@/app/helpers/mocks";
import {Avatar} from "@components/_shared";
import {WalletAddress} from "@components/wallet-address/wallet-address.component";

interface VotesListProps extends BaseComponentProps {
    voteType: VoteType;
}

export const VotesList = ({ voteType, className, style }: VotesListProps) => {

    const votes = votesMock.filter(vote => vote.type === voteType);

    const voters = new Set(...votes.map(item => item.address)).size;
    const totalVotes = votes.reduce((acc, vote) => acc + vote.votes, 0);

    return <div className={classNames(styles.list, className)} style={style}>
        <div className={styles.header}>
            <div>
                {voters} Addresses
            </div>
            <div>
                {totalVotes} Votes
            </div>
        </div>
        {votes.map((vote, index) => <div key={index} className={styles.vote}>
            <div>
                <Avatar address={vote.address} />
                <WalletAddress address={vote.address} />
            </div>
            <div>
                {(vote.votes / totalVotes * 100).toFixed(2)}%
            </div>
        </div>)}
    </div>

}