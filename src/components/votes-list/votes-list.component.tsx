import type { Participant, ProposalVotes } from "@/lib/graphql";
import { Avatar } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import type { IVoteType } from "@/interfaces/vote.interface";
import { formatUnits } from "viem";
import { WalletAddress } from "@/components/index";

interface VotesListProps extends BaseComponentProps {
  voteType: IVoteType;
  votes: ProposalVotes;
}

export const VotesList = ({
  votes,
  voteType,
  className,
  style,
}: VotesListProps) => {
  return (
    <div className={className} style={style}>
      <div className="flex flex-row items-center justify-between pb-x2 text-sm font-light text-gray">
        <div>{votes[voteType].participants.length} Addresses</div>
        <div>
          {Number(formatUnits(votes[voteType].total, 18)).toLocaleString()}{" "}
          Votes
        </div>
      </div>
      {votes[voteType].participants.map((participant: Participant, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between p-x1 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-solid [&:not(:last-child)]:border-gray-light"
        >
          <div className="flex flex-row items-center gap-x1">
            <Avatar address={participant.address} />
            <WalletAddress address={participant.address} />
          </div>
          <div className="flex flex-row items-center gap-x1">
            {getParticipantPercentage(participant, votes.total)}
          </div>
        </div>
      ))}
    </div>
  );
};

const getParticipantPercentage = (
  participant: Participant,
  totalVotes: bigint,
) => {
  // If there are no votes, we need to avoid division by zero
  if (totalVotes > BigInt(0)) {
    return `${Number((participant.weight / totalVotes) * BigInt(100)).toFixed(2)}%`;
  } else return "0%";
};
