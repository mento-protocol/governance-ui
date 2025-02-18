import { ConnectButton } from "@/components/_shared";
import { ProposalActionTitle } from "./proposal-action-title";
import { Card } from "@mento-protocol/ui-toolkit";

export const DisconnectedState = () => {
  return (
    <Card className="flex min-h-[260px] flex-col items-center justify-between gap-[25px] text-center md:text-[20px]/none">
      <ProposalActionTitle>Connect to participate</ProposalActionTitle>
      <span>Please connect your wallet to participate in governance</span>
      <ConnectButton fullwidth theme="primary" />
    </Card>
  );
};
