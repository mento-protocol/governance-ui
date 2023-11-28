import {Card, Input, StepCounter} from "@components/_shared";
import {useContext} from "react";
import {WalletContext} from "@/app/providers/wallet.provider";


export const CreateProposalContentStep = () => {

    const {isAuthenticated, mentoAmount} = useContext(WalletContext)

    return <Card block>
        <Card.Header>
            <div className="flex gap-4 items-center">
                <StepCounter isCard>2</StepCounter>
                Add name and description
            </div>
        </Card.Header>
        <div>
            <p className="text-lg mb-4 ml-10">Give your proposal a title and a description. They will be public when your proposal goes live.</p>
            <Input label="Proposal title"
                   type="text"
                   id="proposal-title"
                   placeholder="Enter a title for your proposal" />
        </div>
    </Card>
}