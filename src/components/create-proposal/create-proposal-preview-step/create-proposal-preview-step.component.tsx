"use client";
import { useState } from "react";
import { ExecutionCodeView, MarkdownView, SeeAll } from "@/components/_shared";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";

export const CreateProposalPreviewStep = () => {
  const [isProposalPreviewOpen, setIsProposalPreviewOpen] = useState(false);
  const { setStep, newProposal, submitProposal } = useCreateProposal();

  return (
    <CreateProposalWrapper
      componentStep={CreateProposalStep.preview}
      title="Preview your proposal"
      onPrev={() => setStep(CreateProposalStep.execution)}
      onSave={submitProposal}
    >
      {/* <pre>{JSON.stringify(createTx, null, 2)}</pre>
      <pre>{createError ? createError.message : null}</pre> */}
      <div>
        <p className="ml-4 text-xl">
          You&apos;ve successfully finished all the steps. Now, take a moment to
          go over your proposal and then submit it.
        </p>
        {/* TODO: Font size 40 but closest is 4xl = 36px */}
        <div className="mt-x5 text-center text-4xl font-medium leading-none">
          {newProposal.title}
        </div>
        <div>
          <h3 className="mx-0 my-x5 flex justify-center text-3xl font-medium">
            Proposal Description
          </h3>
          <SeeAll
            height={315}
            isOpen={isProposalPreviewOpen}
            setIsOpen={setIsProposalPreviewOpen}
          >
            <MarkdownView markdown={newProposal.description} />
          </SeeAll>
          {newProposal.code != "" && (
            <ExecutionCodeView code={newProposal.code} title="Execution code" />
          )}
        </div>
      </div>
    </CreateProposalWrapper>
  );
};
