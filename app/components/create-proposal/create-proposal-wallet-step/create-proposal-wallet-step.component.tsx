import { ConnectButton, MentoLock } from "@components/_shared";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { useCreateProposalStore, useUserStore } from "@/app/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useChainState } from "@/app/providers/chainState.provider";
import { useAccount } from "wagmi";
import useModal from "@/app/providers/modal.provider";

const formStep = CreateProposalFormStepEnum.wallet;

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
  const { veMento, mento } = useChainState((s) => s.tokens);
  const { address } = useAccount();
  const { patchWalletStep, form, next, prev } = useCreateProposalStore();

  const getAndValidateStep = useMemo((): WalletStepEnum => {
    if (!address) {
      return WalletStepEnum.connectWallet;
    } else if (mento.balance <= 0) {
      return WalletStepEnum.buyMento;
    } else if (veMento.balance < 2500) {
      return WalletStepEnum.lockMento;
    } else {
      return WalletStepEnum.createProposal;
    }
  }, [address, mento.balance, veMento.balance]);

  const [walletFormStep, setFormStep] = useState(getAndValidateStep);

  useEffect(() => {
    setFormStep(getAndValidateStep);
    patchWalletStep({
      walletAddress: address || "",
      balanceMENTO: mento.balance,
      balanceVeMENTO: veMento.balance,
    });
  }, [
    address,
    mento.balance,
    getAndValidateStep,
    patchWalletStep,
    veMento.balance,
  ]);

  return (
    <Wrapper
      step={formStep}
      isOpened={form[formStep].isOpened}
      canGoNext={getAndValidateStep === WalletStepEnum.createProposal}
      canGoPrev={false}
      next={next}
      prev={prev}
      title="Connect your wallet & login"
    >
      {form[formStep].isOpened && <CurrentFormStep formStep={walletFormStep} />}
    </Wrapper>
  );
};
