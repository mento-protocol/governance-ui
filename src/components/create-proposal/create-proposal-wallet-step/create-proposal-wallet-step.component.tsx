import { ConnectButton, MentoLock } from "@/components/_shared";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useTokens from "@/lib/contracts/useTokens";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { formatUnits } from "viem";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";
import { formatUnitsWithRadix } from "@/lib/helpers/numbers.service";
import { useProposalThreshold } from "@/lib/contracts/governor/useProposalThreshold";

enum WalletStepEnum {
  connectWallet = "connectWallet",
  buyMento = "buyMento", // No purchasing available
  lockMento = "lockMento",
  createProposal = "createProposal",
}

const CurrentFormStep = ({
  formStep,
}: {
  formStep: WalletStepEnum;
  mentoOutstanding: bigint;
  veMentoOutstanding: bigint;
}) => {
  const { veMentoBalance } = useTokens();
  const { proposalThreshold } = useProposalThreshold();

  switch (formStep) {
    case WalletStepEnum.connectWallet:
      return (
        <>
          <p className="mt-4 place-self-start text-xl">
            Connect your wallet to create new proposal.
          </p>
          <ConnectButton theme="primary" className="mt-6 justify-center" />
        </>
      );
    case WalletStepEnum.buyMento:
      return (
        <>
          <p className="mt-4 place-self-start text-xl">
            You have{" "}
            {formatUnits(veMentoBalance.value, veMentoBalance.decimals)}{" "}
            veMENTO.
            <br />
            To create new governance proposal you need to lock{" "}
            {formatUnitsWithRadix(proposalThreshold, 18, 2)} MENTO.
          </p>
        </>
      );
    case WalletStepEnum.lockMento:
      return (
        <>
          <p className="mt-4 place-self-start text-xl">
            You have{" "}
            {formatUnits(veMentoBalance.value, veMentoBalance.decimals)}{" "}
            veMENTO. To create new governance proposal have at least{" "}
            {formatUnitsWithRadix(proposalThreshold, 18, 2)} veMENTO.
          </p>
          <div className="p-8">
            <MentoLock />
          </div>
        </>
      );
    case WalletStepEnum.createProposal:
      return (
        <>
          <p className="mt-4 place-self-start text-xl">
            Yay! You are all set to create a new proposal!
          </p>
        </>
      );
    default:
      return <></>;
  }
};

export const CreateProposalWalletStep = () => {
  const { address } = useAccount();
  const { mentoBalance, veMentoBalance } = useTokens();
  const { setStep } = useCreateProposal();
  const { proposalThreshold } = useProposalThreshold();

  const [walletFormStep, setWalletStep] = useState(
    WalletStepEnum.connectWallet,
  );

  const [veMentoOutstanding, setVeMentoOutstanding] = useState(0n);
  const [mentoOutstanding, setMentoOutstanding] = useState(0n);

  useEffect(() => {
    let direction = WalletStepEnum.connectWallet;

    if (!address) {
      direction = WalletStepEnum.connectWallet;
    } else if (veMentoBalance.value <= proposalThreshold) {
      setVeMentoOutstanding(proposalThreshold - veMentoBalance.value);
      direction = WalletStepEnum.lockMento;

      if (mentoBalance.value == 0n) {
        setMentoOutstanding(veMentoOutstanding - mentoBalance.value);
        direction = WalletStepEnum.buyMento;
      }
    } else {
      setStep(CreateProposalStep.content);
      direction = WalletStepEnum.createProposal;
    }
    return setWalletStep(direction);
  }, [
    address,
    mentoBalance.decimals,
    mentoBalance.value,
    proposalThreshold,
    setStep,
    veMentoBalance.decimals,
    veMentoBalance.value,
    veMentoOutstanding,
  ]);

  return (
    <CreateProposalWrapper
      componentStep={CreateProposalStep.wallet}
      onNext={
        walletFormStep === WalletStepEnum.createProposal
          ? () => setStep(CreateProposalStep.content)
          : undefined
      }
      title="Connect your wallet & login"
    >
      <CurrentFormStep
        formStep={walletFormStep}
        mentoOutstanding={mentoOutstanding}
        veMentoOutstanding={veMentoOutstanding}
      />
    </CreateProposalWrapper>
  );
};
