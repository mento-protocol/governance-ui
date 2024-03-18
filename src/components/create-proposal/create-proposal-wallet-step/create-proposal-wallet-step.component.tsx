import { ConnectButton, MentoLock } from "@components/_shared";
import { useCallback, useState } from "react";
import { useAccount } from "wagmi";
import useTokens from "@lib/contracts/useTokens";
import CreateProposalWrapper from "@components/create-proposal/create-proposal-wrapper/create-proposal-wrapper.component";
import {
  CreateProposalStep,
  useCreateProposal,
} from "@components/create-proposal/create-proposal-provider";

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
    } else if (mentoBalance.value <= 10) {
      return WalletStepEnum.buyMento;
    } else if (veMentoBalance.value < 2500) {
      return WalletStepEnum.lockMento;
    } else {
      return WalletStepEnum.createProposal;
    }
  }, [address, mentoBalance.value, veMentoBalance.value]);

  const [walletFormStep, setFormStep] = useState(getAndValidateStep());

  return (
    <CreateProposalWrapper
      isOpened={true}
      onNext={() => setStep(CreateProposalStep.content)}
      title="Connect your wallet & login"
    >
      <CurrentFormStep formStep={walletFormStep} />
    </CreateProposalWrapper>
  );
};
