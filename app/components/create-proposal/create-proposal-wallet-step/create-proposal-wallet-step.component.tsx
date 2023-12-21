import {ConnectButton, MntoLock} from "@components/_shared";
import {useAccount, useBalance} from "wagmi";
import {useCreateProposalContext} from "@/app/providers/create-proposal.provider";
import styles from '../create-proposal.module.scss'
import {CreateProposalFormStepEnum} from "@interfaces/create-proposal.interface";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";

const formStep = CreateProposalFormStepEnum.wallet;

export const CreateProposalWalletStep = () => {

    const { isConnected, address } = useAccount();
    const { data} = useBalance({
        address: address,
    })

    const {form} = useCreateProposalContext();

    return <Wrapper step={formStep} title="Connect your wallet & login" isOpened={form[formStep].isOpened}>
        <div>
            {!isConnected && <>
                <p className="text-lg mb-4 ml-10 place-self-start">Connect your wallet to create new proposal.</p>
                <ConnectButton theme="primary"/></>}

            {
                    isConnected && data?.value! < 400 && <>
                        <p className="text-lg mb-4 ml-10 place-self-start">To create new governance proposal you need to lock
                            2,500 veMNTO.</p>
                        <p className="text-lg mb-4 ml-10 place-self-start">You can purchase MNTO <a
                                href={'https://app.mento.org'} target="_blank">here.</a></p>
                    </>
            }
            {
                    isConnected && data?.value! >= 400 && <>
                        <p className="text-lg mb-4 ml-10 place-self-start">To create new governance proposal you need to lock
                            2,500 veMNTO.</p>
                        <MntoLock/>
                    </>
            }
        </div>
    </Wrapper>
}