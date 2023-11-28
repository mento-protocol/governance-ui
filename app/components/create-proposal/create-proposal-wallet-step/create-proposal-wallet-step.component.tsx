import {Card, ConnectButton, MntoLock, StepCounter} from "@components/_shared";
import {useContext} from "react";
import {WalletContext} from "@/app/providers/wallet.provider";


export const CreateProposalWalletStep = () => {

    const {isAuthenticated, mentoAmount} = useContext(WalletContext)

    return <Card block>
        <Card.Header>
            <div className="flex gap-4 items-center">
                <StepCounter isCard>1</StepCounter>
                Connect your wallet & login
            </div>
        </Card.Header>
        <div className="mt-5 flex flex-col place-items-center full-w">
            {!isAuthenticated && <>
                <p className="text-lg mb-4 ml-10 place-self-start">Connect your wallet to create new proposal.</p>
                <ConnectButton theme="primary"/></>}

            {
                isAuthenticated && mentoAmount < 400 && <>
                    <p className="text-lg mb-4 ml-10 place-self-start">To create new governance proposal you need to lock
                        2,500 veMNTO.</p>
                    <p className="text-lg mb-4 ml-10 place-self-start">You can purchase MNTO <a
                        href={'https://app.mento.org'} target="_blank">here.</a></p>
                </>
            }
            {
                isAuthenticated && mentoAmount >= 400 && <>
                    <p className="text-lg mb-4 ml-10 place-self-start">To create new governance proposal you need to lock
                        2,500 veMNTO.</p>
                    <MntoLock/>
                </>
            }
        </div>
    </Card>
}