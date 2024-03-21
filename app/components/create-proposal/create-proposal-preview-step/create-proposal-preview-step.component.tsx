"use client";
import { GovernorABI } from "@/app/abis/Governor";
import { useContracts } from "@/app/hooks/useContracts";
import { useCreateProposalStore } from "@/app/store";
import {
  Button,
  ExecutionCodeView,
  MarkdownView,
  SeeAll,
} from "@components/_shared";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Address } from "viem";
import styles from "./create-proposal-preview-step.module.scss";
import { useSimulateContract, useWriteContract } from "wagmi";
import { useRouter } from "next/navigation";
import useModal from "@/app/providers/modal.provider";
import { err } from "pino-std-serializers";
import { toast } from "sonner";

type ProposalCreateParams = {
  metadata: { title: string; description: string };
  transactions: Array<{
    address: string;
    value: string | number;
    data: string;
  }>;
};

const ErrorNode = ({ error, details }: { error: string; details: string }) => {
  const { showModal } = useModal();
  return (
    <div className="flex justify-center items-center text-error">
      {error}
      <button
        className="text-error bg-transparent border-none ml-x2 cursor-pointer hover:underline"
        onClick={() =>
          showModal(
            <pre className="my-x3 p-x2 text-error border-solid border border-error rounded-x1">
              {details}
            </pre>,
          )
        }
      >
        Show more
      </button>
    </div>
  );
};

export const CreateProposalPreviewStep = () => {
  const [isProposalPreviewOpen, setIsProposalPreviewOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { form, next, prev, openedForm, start } = useCreateProposalStore();
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

  const {
    error: simulatedContractError,
    isError: isSimulatedContractError,
    isPending: isSimulatedContractPending,
    refetch: refetchSimulatedCall,
  } = useSimulateContract({
    address: contracts?.MentoGovernor.address as Address,
    abi: GovernorABI,
    functionName: "propose",
    query: {
      enabled: openedForm === CreateProposalFormStepEnum.preview,
    },
    args: [
      proposal.transactions.map(
        (transaction) => transaction.address as Address,
      ),
      proposal.transactions.map((transaction) => {
        try {
          return BigInt(transaction.value);
        } catch {
          return 0n;
        }
      }),
      proposal.transactions.map((transaction) => transaction.data),
      JSON.stringify(proposal.metadata),
    ] as any,
  });

  useEffect(() => {
    if (form[CreateProposalFormStepEnum.preview].isOpened) {
      refetchSimulatedCall();
    }
  }, [form, proposal, refetchSimulatedCall]);

  const onSave = useCallback(async () => {
    setIsPending(true);

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

    writeContract(contractParams, {
      onSuccess: () => {
        toast.success("Proposal created successfully");
        router.push("/");
        localStorage.removeItem("proposalTitle");
        localStorage.removeItem("proposalDescription");
        localStorage.removeItem("proposalExecutionCode");
        setIsPending(false);
        start();
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
    start,
  ]);

  const errorNode = useMemo(() => {
    if (isSimulatedContractError) {
      return (
        <ErrorNode
          error="An error occurred simulating your proposal"
          details={simulatedContractError.message}
        />
      );
    } else if (error) {
      return (
        <ErrorNode
          error="An error occurred creating your proposal"
          details={error.message}
        />
      );
    }
  }, [isSimulatedContractError, simulatedContractError, error]);

  return (
    <Wrapper
      step={CreateProposalFormStepEnum.preview}
      title="Preview your proposal"
      next={onSave}
      prev={prev}
      canGoNext={
        !isPending && !isSimulatedContractError && !isSimulatedContractPending
      }
      isPending={isPending || isSimulatedContractPending}
      className={styles.container}
      isOpened={form[CreateProposalFormStepEnum.preview].isOpened}
      error={errorNode}
    >
      {form[CreateProposalFormStepEnum.preview].isOpened && (
        <div>
          <div className="ml-x7">
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
