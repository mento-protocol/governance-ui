import { Card, ConnectButton } from "../_shared";
import VotingCardTitle from "../_shared/vote-voting-card-title/voting-card-title";

const DisconnectedState = () => {
  return (
    <Card>
      <div className="flex flex-col gap-[25px] ">
        <VotingCardTitle />
        <span>Please connect your wallet to vote</span>
        <ConnectButton block theme="primary" />
      </div>
    </Card>
  );
};

export default DisconnectedState;
