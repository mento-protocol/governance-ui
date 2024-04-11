import { ConnectButton, MentoLock } from "@/components/_shared";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import useTokens from "@/lib/contracts/useTokens";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { parseUnits } from "viem";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";

enum WalletStepEnum {
  connectWallet = "connectWallet",
  buyMento = "buyMento",
  lockMento = "lockMento",
  createProposal = "createProposal",
}

const CurrentFormStep = ({ formStep }: { formStep: WalletStepEnum }) => {
  switch (formStep) {
    case WalletStepEnum.connectWallet:
      return (
        <>
          <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">
            Connect your wallet to create new proposal.
          </p>
          <ConnectButton theme="primary" className="mt-x5" />
        </>
      );
    case WalletStepEnum.buyMento:
      return (
        <>
          <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">
            To create new governance proposal you need to lock 2,500 veMENTO.
          </p>
          <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">
            You can purchase MENTO{" "}
            <a href={"https://app.mento.org"} target="_blank">
              here.
            </a>
          </p>
        </>
      );
    case WalletStepEnum.lockMento:
      return (
        <>
          <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">
            To create new governance proposal you need to lock 2,500 veMENTO.
          </p>
          <MentoLock />
        </>
      );
    case WalletStepEnum.createProposal:
      return (
        <>
          <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">
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

  const getAndValidateStep = useCallback((): WalletStepEnum => {
    if (!address) {
      return WalletStepEnum.connectWallet;
    } else if (mentoBalance.value <= parseUnits("10", mentoBalance.decimals)) {
      return WalletStepEnum.buyMento;
    } else if (
      veMentoBalance.value < parseUnits("2500", veMentoBalance.decimals)
    ) {
      return WalletStepEnum.lockMento;
    } else {
      return WalletStepEnum.createProposal;
    }
  }, [
    address,
    mentoBalance.decimals,
    mentoBalance.value,
    veMentoBalance.decimals,
    veMentoBalance.value,
  ]);

  const [walletFormStep] = useState(getAndValidateStep());

  return (
    <CreateProposalWrapper
      componentStep={CreateProposalStep.wallet}
      onNext={() => setStep(CreateProposalStep.content)}
      title="Connect your wallet & login"
    >
      <CurrentFormStep formStep={walletFormStep} />
    </CreateProposalWrapper>
  );
};
