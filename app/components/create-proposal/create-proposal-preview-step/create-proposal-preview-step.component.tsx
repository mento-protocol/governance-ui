"use client";
import { GovernorABI } from "@/app/abis/Governor";
import { useContracts } from "@/app/hooks/useContracts";
import { useCreateProposalStore } from "@/app/store";
import { ExecutionCodeView, MarkdownView, SeeAll } from "@components/_shared";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useCallback, useMemo, useState } from "react";
import { Address } from "viem";
import styles from "./create-proposal-preview-step.module.scss";
import { useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import { simulateContract } from "@wagmi/core";
import { wagmiConfig } from "@/app/helpers/wagmi.config";

const formStep = CreateProposalFormStepEnum.preview;

type ProposalCreateParams = {
  metadata: { title: string; description: string };
  transactions: Array<{
    address: string;
    value: string | number;
    data: string;
  }>;
};

export const CreateProposalPreviewStep = () => {
  const [isProposalPreviewOpen, setIsProposalPreviewOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSimulationError, setIsSimulationError] = useState(false);
  const { form, next, prev } = useCreateProposalStore();
  const { data, error, writeContract } = useWriteContract();
  const contracts = useContracts();
  const router = useRouter();

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

  const onSave = useCallback(async () => {
    setIsPending(true);
    setIsSimulationError(false);

    const contractParams = {
      address: contracts?.MentoGovernor.address as Address,
      abi: GovernorABI,
      functionName: "propose",
      args: [
        proposal.transactions.map(
          (transaction) => transaction.address as Address,
        ),
        proposal.transactions.map((transaction) => BigInt(transaction.value)),
        proposal.transactions.map((transaction) => transaction.data),
        JSON.stringify(proposal.metadata),
      ] as any,
    } as any;

    try {
      await simulateContract(wagmiConfig, contractParams);
    } catch (e: any) {
      setIsPending(false);
      setIsSimulationError(true);
      return;
    }

    writeContract(contractParams, {
      onSuccess: () => {
        setIsPending(false);
        setIsSimulationError(false);
        router.push("/");
        localStorage.removeItem("proposalTitle");
        localStorage.removeItem("proposalDescription");
        localStorage.removeItem("proposalExecutionCode");
      },
      onError: () => {
        setIsPending(false);
      },
    });
  }, [
    contracts?.MentoGovernor.address,
    proposal.transactions,
    proposal.metadata,
    writeContract,
    router,
  ]);

  return (
    <Wrapper
      step={formStep}
      title="Preview your proposal"
      next={onSave}
      prev={prev}
      canGoNext={!isPending}
      isPending={isPending}
      className={styles.container}
      isOpened={form[formStep].isOpened}
    >
      {form[formStep].isOpened && (
        <div>
          <div className="ml-x7">
            {error && (
              <pre className="my-x3 p-x2 text-error border-solid border border-error rounded-x1">
                {error.message}
              </pre>
            )}
            {isSimulationError && (
              <pre className="my-x3 p-x2 text-error border-solid border border-error rounded-x1">
                Contract simulation error - please check your data
              </pre>
            )}
            <p className="font-size-x4 line-height-x5">
              You&apos;ve successfully finished all the steps. Now, take a
              moment to go over your proposal and then submit it.
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
              <ExecutionCodeView
                code={
                  form[CreateProposalFormStepEnum.execution].value.code.value
                }
              />
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
