import { Card } from "@/components/_shared";
import VotingCardTitle from "@/components/_shared/vote-voting-card-title/voting-card-title";
import VoteTypePill from "./vote-type-pill";

const HasVoted = ({ voteType }: { voteType: number }) => {
  return (
    <Card>
      <VotingCardTitle />
      <div className="flex min-h-[163px] flex-col justify-between font-fg text-[22px] leading-[22px]">
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
