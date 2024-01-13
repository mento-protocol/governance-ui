"use client";
import { useCreateProposalStore } from "@/app/store";
import { MarkdownView } from "@components/_shared";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import IProposal from "@interfaces/proposal.interface";
import { useMemo } from "react";

const formStep = CreateProposalFormStepEnum.preview;

export const CreateProposalPreviewStep = () => {
    const { form } = useCreateProposalStore();

    const proposal = useMemo(() => {
        const { title, description, createDate, deadlineDate } = form[CreateProposalFormStepEnum.content].value;
        return {
            title: title.value,
            description: description.value,
            deadlineAt: deadlineDate.value,
            createdAt: createDate.value,
            creator: form[CreateProposalFormStepEnum.wallet].value.walletAddress.value,
        } as IProposal;
    }, [form]);

    return (
        <Wrapper step={formStep} title="Preview your proposal">
            <div className="ml-x7">
                <p className="font-size-x4 line-height-x5">
                    You&apos;ve successfully finished all the steps. Now, take a moment to go over your proposal and
                    then submit it.
                </p>
                <div className="font-size-x6 line-height-x7 text-center mt-x5 mb-x7 font-medium">{proposal.title}</div>
                <div>
                    <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium">
                        Proposal Description
                    </h3>
                    <MarkdownView markdown={proposal.description} />
                </div>
            </div>
        </Wrapper>
    );
};
