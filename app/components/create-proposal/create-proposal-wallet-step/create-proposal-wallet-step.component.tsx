import { ConnectButton, MentoLock } from "@components/_shared";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { useCreateProposalStore } from "@/app/store";
import { useEffect, useMemo, useState } from "react";
import { useChainState } from "@/app/providers/chainState.provider";
import { useAccount } from "wagmi";
import useModal from "@/app/providers/modal.provider";
import { debounce } from "lodash";

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
  const {
    patchWalletStep,
    form,
    openedForm,
    next,
    prev,
    patchContentStep,
    patchExecutionStep,
  } = useCreateProposalStore();
  const { showConfirm } = useModal();

  const validateCacheAndNavigate = debounce(
    () => {
      const cacheTitle = localStorage.getItem("proposalTitle");
      const cacheDescription = localStorage.getItem("proposalDescription");
      const cacheExecutionCode = localStorage.getItem("proposalExecutionCode");

      if (cacheTitle || cacheDescription || cacheExecutionCode) {
        localStorage.removeItem("proposalTitle");
        localStorage.removeItem("proposalDescription");
        localStorage.removeItem("proposalExecutionCode");
        showConfirm("Do you want to load the cached proposal?").then((res) => {
          if (res) {
            patchContentStep({
              title: cacheTitle || "",
              description: cacheDescription || "",
            });
            patchExecutionStep({
              code: cacheExecutionCode || "",
            });
          }
          next();
        });
      } else {
        next();
      }
    },
    1000,
    { leading: true, trailing: false },
  );

  useEffect(() => {
    return () => {
      validateCacheAndNavigate.cancel();
    };
  }, [validateCacheAndNavigate]);

  const walletStep = useMemo((): WalletStepEnum => {
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

  useEffect(() => {
    if (walletStep === WalletStepEnum.createProposal) {
      if (openedForm === formStep) {
        validateCacheAndNavigate();
      }
    }
    patchWalletStep({
      walletAddress: address || "",
      balanceMENTO: mento.balance,
      balanceVeMENTO: veMento.balance,
    });
  }, [address, mento.balance, walletStep, patchWalletStep, veMento.balance]);

  return (
    <Wrapper
      step={formStep}
      isOpened={form[formStep].isOpened}
      canGoNext={walletStep === WalletStepEnum.createProposal}
      canGoPrev={false}
      next={next}
      prev={prev}
      title="Connect your wallet & login"
    >
      {form[formStep].isOpened && <CurrentFormStep formStep={walletStep} />}
    </Wrapper>
  );
};
