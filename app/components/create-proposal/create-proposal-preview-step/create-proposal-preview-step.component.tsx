"use client";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { format } from "date-fns";
import { WalletAddressWithCopy, MarkdownView } from "@components/_shared";
import { Avatar } from "../../_shared";
import {useCreateProposalStore} from "@/app/store";
import {useMemo} from "react";
import IProposal from "@interfaces/proposal.interface";

const formStep = CreateProposalFormStepEnum.preview

export const CreateProposalPreviewStep = () => {

    const { form } = useCreateProposalStore();

    const proposal = useMemo(() => {
        const {title, description, creteDate, deadlineDate} = form[CreateProposalFormStepEnum.content].value
        return {
            title: title.value,
            description: description.value,
            deadlineAt: deadlineDate.value,
            createdAt: creteDate.value,
            creator: form[CreateProposalFormStepEnum.wallet].value.walletAddress.value,
        } as IProposal;
    }, [form]);

    return <Wrapper step={formStep} title="Preview your proposal">
        <div className="ml-x7 mr-x8">
            <p className="text-lg">You&apos;ve successfully finished all the steps. Now, take a moment to go over your proposal and then submit it.</p>
            <div className="font-size-x6 line-height-x7 text-center mt-x5 mb-x7 font-medium">{proposal.title}</div>
            <div className="flex justify-center gap-x6 mb-x4">
                <div className="flex place-items-center gap-1">
                    <span>Proposed on:</span>
                    <strong>{format(proposal.createdAt, 'MMMM do, yyyy')}</strong>
                </div>
                <div className="flex place-items-center gap-1">
                    <span>Voting deadline:</span>
                    <strong>{format(proposal.deadlineAt, 'MMMM do, yyyy')}</strong>
                </div>
            </div>
            <div className="flex gap-x2 justify-center mb-x5">
                <Avatar address={proposal.creator || ''} />
                <WalletAddressWithCopy address={proposal.id} />
            </div>
            <div>
                <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium">Details</h3>
                <MarkdownView markdown={proposal.description} />
            </div>
        </div>
    </Wrapper>
}