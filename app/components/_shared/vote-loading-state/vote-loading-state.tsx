import { Card, Loader } from "..";
import VotingCardTitle from "../vote-voting-card-title/voting-card-title";

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
