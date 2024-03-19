import { Card, Loader } from "@/components/_shared";
import VotingCardTitle from "@/components/_shared/vote-voting-card-title/voting-card-title";

const LoadingState = () => {
  return (
    <Card>
      <VotingCardTitle />
      <div className="flex flex-col gap-x3 mt-x2 text-center">
        <br />
        <Loader isCenter />
        <br />
      </div>
    </Card>
  );
};

export default LoadingState;
