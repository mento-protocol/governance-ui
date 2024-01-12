import {ConnectButton, MntoLock} from "@components/_shared";
import {CreateProposalFormStepEnum} from "@interfaces/create-proposal.interface";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import {useCreateProposalStore, useUserStore} from "@/app/store";
import {useCallback, useEffect, useMemo, useState} from "react";

const formStep = CreateProposalFormStepEnum.wallet;

enum WalletStepEnum {
    connectWallet = 'connectWallet',
    buyMnto = 'buyMnto',
    lockMnto = 'lockMnto',
    createProposal = 'createProposal'
}

const CurrentFormStep = ({formStep}: { formStep: WalletStepEnum }) => {
    switch (formStep) {
        case WalletStepEnum.connectWallet:
            return <>
                <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">Connect your wallet to create new proposal.</p>
                <ConnectButton theme="primary"/>
            </>;
        case WalletStepEnum.buyMnto:
            return <>
                <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">To create new governance proposal you need to
                    lock
                    2,500 veMNTO.</p>
                <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">You can purchase MNTO <a
                        href={'https://app.mento.org'} target="_blank">here.</a></p>
            </>;
        case WalletStepEnum.lockMnto:
            return <>
                <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">To create new governance proposal you need to
                    lock
                    2,500 veMNTO.</p>
                <MntoLock/>
            </>;
        case WalletStepEnum.createProposal:
            return <>
                <p className="font-size-x4 line-height-x5 ml-x7 place-self-start">Yay! You are all set to create a new proposal!</p>
            </>;
        default:
            return <></>;

    }
}

export const CreateProposalWalletStep = () => {

    const {walletAddress, balanceVeMENTO, balanceMENTO} = useUserStore();
    const {form, patchWalletStep} = useCreateProposalStore();

    const getAndValidateStep = useCallback((): WalletStepEnum => {
        if (!walletAddress) {
            return WalletStepEnum.connectWallet;
        } else if (balanceMENTO <= 10) {
            return WalletStepEnum.buyMnto;
        } else if (balanceVeMENTO < 2500) {
            return WalletStepEnum.lockMnto;
        } else {
            return WalletStepEnum.createProposal;
        }
    }, [walletAddress, balanceVeMENTO, balanceMENTO]);


    const [walletFormStep, setFormStep] = useState(getAndValidateStep())


    useEffect(() => {
        setFormStep(getAndValidateStep());
        patchWalletStep({
            walletAddress: walletAddress || '',
            balanceVeMENTO,
            balanceMENTO,
        });
    }, [walletAddress, balanceVeMENTO, balanceMENTO, getAndValidateStep, patchWalletStep]);

    return <Wrapper step={formStep} title="Connect your wallet & login">
        <CurrentFormStep formStep={walletFormStep}/>
    </Wrapper>
}