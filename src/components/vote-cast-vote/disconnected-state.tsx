import { Card, ConnectButton, VotingCardTitle } from "@/components/_shared";

export const DisconnectedState = () => {
  return (
    <Card>
      <div className="flex flex-col gap-[25px] ">
        <VotingCardTitle />
        <span>Please connect your wallet to vote</span>
        <ConnectButton fullwidth theme="primary" />
      </div>
    </Card>
  );
};
