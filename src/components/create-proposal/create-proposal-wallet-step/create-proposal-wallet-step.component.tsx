import { ConnectButton, MentoLock } from "@/components/_shared";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useTokens from "@/lib/contracts/useTokens";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { formatUnits, parseUnits } from "viem";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";
import Link from "next/link";
import { formatUnitsWithRadix } from "@/lib/helpers/numbers.service";

enum WalletStepEnum {
  connectWallet = "connectWallet",
  buyMento = "buyMento",
  lockMento = "lockMento",
  createProposal = "createProposal",
}

const CurrentFormStep = ({
  formStep,
  mentoOutstanding,
  veMentoOutstanding,
}: {
  formStep: WalletStepEnum;
  mentoOutstanding: bigint;
  veMentoOutstanding: bigint;
}) => {
  const { mentoBalance, veMentoBalance } = useTokens();

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
            You have {formatUnits(mentoBalance.value, mentoBalance.decimals)}{" "}
            MENTO & {formatUnits(veMentoBalance.value, veMentoBalance.decimals)}{" "}
            veMENTO.
            <br />
            To create new governance proposal you need to lock 2,500 MENTO.
            <br />
            Please purchase {formatUnitsWithRadix(mentoOutstanding, 18, 4)}{" "}
            additional MENTO to continue.
          </p>
          <p className="font-size-x4 line-height-x5 place-self-start">
            You can purchase MENTO{" "}
            <Link
              href={"https://app.mento.org"}
              className="text-primary underline"
              target="_blank"
            >
              here.
            </Link>
          </p>
        </>
      );
    case WalletStepEnum.lockMento:
      return (
        <>
          <p className="mt-4 place-self-start text-xl">
            You have{" "}
            {formatUnits(veMentoBalance.value, veMentoBalance.decimals)}{" "}
            veMENTO. To create new governance proposal you need to lock{" "}
            {formatUnits(veMentoOutstanding, veMentoBalance.decimals)}
            MENTO and have at least 2,500 veMENTO
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

  const [walletFormStep, setWalletStep] = useState(
    WalletStepEnum.connectWallet,
  );

  const [veMentoOutstanding, setVeMentoOutstanding] = useState(0n);
  const [mentoOutstanding, setMentoOutstanding] = useState(0n);

  useEffect(() => {
    let direction = WalletStepEnum.connectWallet;
    const targetVeMento = parseUnits("2500", veMentoBalance.decimals);

    // TODO: Check if veMento + mento balance >= 2500 ? lock || buy mento
    if (!address) {
      direction = WalletStepEnum.connectWallet;
    } else if (veMentoBalance.value <= targetVeMento) {
      setVeMentoOutstanding(targetVeMento - veMentoBalance.value);
      direction = WalletStepEnum.lockMento;

      if (mentoBalance.value < veMentoOutstanding) {
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
