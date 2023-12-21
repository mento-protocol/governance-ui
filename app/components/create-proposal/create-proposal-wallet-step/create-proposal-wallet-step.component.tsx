import {Card, ConnectButton, MntoLock, StepCounter} from "@components/_shared";
import {useAccount, useBalance} from "wagmi";
import {useCreateProposalContext} from "@/app/providers/create-proposal.provider";
import styles from '../create-proposal.module.scss'
import classNames from "classnames";
import {CreateProposalFormStepEnum} from "@interfaces/create-proposal.interface";

const formStep = CreateProposalFormStepEnum.wallet;

export const CreateProposalWalletStep = () => {

    const { isConnected, address } = useAccount();
    const { data} = useBalance({
        address: address,
    })

    const {form} = useCreateProposalContext();

    return <Card block>
        <Card.Header>
            <div className="flex gap-4 items-center bg-inherit">
                <StepCounter>1</StepCounter>
                Connect your wallet & login
            </div>
        </Card.Header>
        <div className={classNames(styles.form_element, form[formStep].isOpened && styles.opened, 'mt-5 flex flex-col place-items-center full-w')}>
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
    </Card>
}