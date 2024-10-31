import { Card, ConnectButton } from "@/components/_shared";
import { ProposalActionTitle } from "./proposal-action-title";

export const DisconnectedState = () => {
  return (
    <Card>
      <div className="flex w-full flex-col items-center gap-[25px]">
        <ProposalActionTitle />
        <span>Please connect your wallet to participate in governance</span>
        <ConnectButton fullwidth theme="primary" />
      </div>
    </Card>
  );
};
