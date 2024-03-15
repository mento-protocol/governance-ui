"use client";
import { useCallback, useMemo, useState } from "react";
import { useCreateProposalStore } from "@lib/store";
import { ExecutionCodeView, MarkdownView, SeeAll } from "@components/_shared";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import useCreateProposal, {
  ProposalCreateParams,
} from "@lib/contracts/governor/useCreateProposal";
import styles from "./create-proposal-preview-step.module.scss";

const formStep = CreateProposalFormStepEnum.preview;

export const CreateProposalPreviewStep = () => {
  const [isProposalPreviewOpen, setIsProposalPreviewOpen] = useState(false);
  const { form } = useCreateProposalStore();
  const { createProposal, createError, createTx } = useCreateProposal();

  const proposal: ProposalCreateParams = useMemo(() => {
    const { title, description } =
      form[CreateProposalFormStepEnum.content].value;
    let transactions = [];
    try {
      transactions = JSON.parse(
        form[CreateProposalFormStepEnum.execution].value.code.value,
      );
    } catch (e) {}

    if (transactions.length === 0) {
      transactions = [
        {
          address: "0x0000000000000000000000000000000000000000",
          value: 0,
          data: "0x",
        },
      ];
    }

    return {
      metadata: {
        title: title.value,
        description: description.value,
      },
      transactions,
    };
  }, [form]);

  const onSave = useCallback(
    () => createProposal(proposal),
    [createProposal, proposal],
  );

  return (
    <Wrapper
      step={formStep}
      title="Preview your proposal"
      onSave={onSave}
      className={styles.container}
    >
      <pre>{JSON.stringify(createTx, null, 2)}</pre>
      <pre>{createError ? createError.message : null}</pre>
      <div className="ml-x7">
        <p className="font-size-x4 line-height-x5">
          You&apos;ve successfully finished all the steps. Now, take a moment to
          go over your proposal and then submit it.
        </p>
        <div className={styles.title}>{proposal.metadata.title}</div>
        <div>
          <h3 className={styles.form_data_title}>Proposal Description</h3>
          <SeeAll
            height="315"
            isOpen={isProposalPreviewOpen}
            setIsOpen={setIsProposalPreviewOpen}
          >
            <MarkdownView markdown={proposal.metadata.description} />
          </SeeAll>
          <ExecutionCodeView code={proposal.transactions} />
        </div>
      </div>
    </Wrapper>
  );
};
