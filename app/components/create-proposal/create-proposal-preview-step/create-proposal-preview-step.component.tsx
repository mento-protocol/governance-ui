"use client";
import { singleProposal } from "@/app/helpers/mocks";
import { useCreateProposalContext } from "@/app/providers/create-proposal.provider";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Avatar, MarkdownView, WalletAddressWithCopy } from "../../_shared";

const formStep = CreateProposalFormStepEnum.preview

export const CreateProposalPreviewStep = () => {

    const { form } = useCreateProposalContext();

    const {
        register,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>({
        mode: 'onChange'
    });

    const proposal = singleProposal;

    return <Wrapper isOpened={form[formStep].isOpened} step={formStep} title="Preview your proposal">
        <div className="ml-x7 mr-x8">
            <p className="text-lg">You&apos;ve successfully finished all the steps. Now, take a moment to go over your proposal and then submit it.</p>
            <div className="text-[30px] leading-x7 text-center mt-x5 mb-x7 font-medium">{proposal.title}</div>
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
                <h3 className="flex justify-center text-[30px] leading-x6 font-medium">Details</h3>
                <MarkdownView markdown={proposal.description} />
            </div>
        </div>
    </Wrapper>
}