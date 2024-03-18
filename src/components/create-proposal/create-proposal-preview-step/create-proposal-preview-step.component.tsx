"use client";
import { useState } from "react";
import { ExecutionCodeView, MarkdownView, SeeAll } from "@components/_shared";
import styles from "./create-proposal-preview-step.module.scss";
import CreateProposalWrapper from "@components/create-proposal/create-proposal-wrapper/create-proposal-wrapper.component";
import {
  CreateProposalStep,
  useCreateProposal,
} from "@components/create-proposal/create-proposal-provider";
import useCreateProposalOnChain from "@lib/contracts/governor/useCreateProposalOnChain";

export const CreateProposalPreviewStep = () => {
  const [isProposalPreviewOpen, setIsProposalPreviewOpen] = useState(false);
  const { createError, createTx } = useCreateProposalOnChain();
  const { setStep, newProposal, submitProposal } = useCreateProposal();

  return (
    <CreateProposalWrapper
      componentStep={CreateProposalStep.preview}
      title="Preview your proposal"
      onPrev={() => setStep(CreateProposalStep.execution)}
      className={styles.container}
      onSave={submitProposal}
    >
      <pre>{JSON.stringify(createTx, null, 2)}</pre>
      <pre>{createError ? createError.message : null}</pre>
      <div className="ml-x7">
        <p className="font-size-x4 line-height-x5">
          You&apos;ve successfully finished all the steps. Now, take a moment to
          go over your proposal and then submit it.
        </p>
        <div className={styles.title}>{newProposal.title}</div>
        <div>
          <h3 className={styles.form_data_title}>Proposal Description</h3>
          <SeeAll
            height="315"
            isOpen={isProposalPreviewOpen}
            setIsOpen={setIsProposalPreviewOpen}
          >
            <MarkdownView markdown={newProposal.description} />
          </SeeAll>
          {newProposal.code != "" && (
            <ExecutionCodeView code={newProposal.code} />
          )}
        </div>
      </div>
    </CreateProposalWrapper>
  );
};
