import { Card } from "../_shared";
import VotingCardTitle from "../_shared/vote-voting-card-title/voting-card-title";
import VoteTypePill from "./vote-type-pill";

const HasVoted = ({ voteType }: { voteType: number }) => {
  return (
    <Card>
      <VotingCardTitle />
      <div className="flex flex-col min-h-[163px] justify-between text-[22px] leading-[22px] font-fg">
        <div className="flex-grow" />
        <div>
          <span>{`You already voted `}</span>
          <VoteTypePill voteType={voteType} />
          <span>{` on this proposal`}</span>
        </div>
        <div className="h-x4" />
        <span>Thank you for participating in the Mento ecosystem!</span>
        <div className="flex-grow" />
      </div>
    </Card>
  );
};

export default HasVoted;
