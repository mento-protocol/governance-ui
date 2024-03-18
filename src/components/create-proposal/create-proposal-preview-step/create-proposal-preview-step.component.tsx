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

  // const proposal: ProposalCreateParams = useMemo(() => {
  //   const { title, description } =
  //     form[CreateProposalFormStepEnum.content].value;
  //   let transactions = [];
  //   try {
  //     transactions = JSON.parse(
  //       form[CreateProposalFormStepEnum.execution].value.code.value,
  //     );
  //   } catch (e) {}

  //   if (transactions.length === 0) {
  //     transactions = [
  //       {
  //         address: "0x0000000000000000000000000000000000000000",
  //         value: 0,
  //         data: "0x",
  //       },
  //     ];
  //   }

  //   return {
  //     metadata: {
  //       title: title.value,
  //       description: description.value,
  //     },
  //     transactions,
  //   };
  // }, [form]);

  // const onSave = useCallback(
  //   () => createProposal(proposal),
  //   [createProposal, proposal],
  // );

  return (
    <CreateProposalWrapper
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
        <div className={styles.title}>{newProposal.metadata.title}</div>
        <div>
          <h3 className={styles.form_data_title}>Proposal Description</h3>
          <SeeAll
            height="315"
            isOpen={isProposalPreviewOpen}
            setIsOpen={setIsProposalPreviewOpen}
          >
            <MarkdownView markdown={newProposal.metadata.description} />
          </SeeAll>
          <ExecutionCodeView code={newProposal.transactions} />
        </div>
      </div>
    </CreateProposalWrapper>
  );
};
