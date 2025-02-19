"use client";
import { useEffect, useState } from "react";
import { object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@/components/_shared";
import { Button, HelpIcon } from "@mento-protocol/ui-toolkit";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";
import { ExecutionExplanationModal } from "@/components/create-proposal/explainer-modal/execution-explainer.modal";
import { isTransactionItem } from "@/lib/contracts/governor/useCreateProposalOnChain";

export const CreateProposalExecutionStep = () => {
  const { setStep, newProposal, updateProposal } = useCreateProposal();
  const [showExecutionExplanation, setShowExecutionExplanation] =
    useState(false);

  const validationSchema = object().shape({
    code: string()
      .test(
        "json",
        "Invalid JSON format, click the info icon for an example:",
        (value) => {
          if (!value) return true;
          try {
            const parsedValue = JSON.parse(value);
            if (Array.isArray(parsedValue)) {
              return (
                parsedValue.filter((item) => !isTransactionItem(item))
                  .length === 0
              );
            } else {
              return false;
            }
          } catch (error) {
            return false;
          }
        },
      )
      .typeError("Invalid code"),
  });

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      code: '[\n  {\n    "address": "0x0000000000000000000000000000000000000000",\n    "value": 0,\n    "data": "0x"\n  }\n]',
    },
    values: {
      code: newProposal.code,
    },
    mode: "onChange",
  });

  setLocale({
    mixed: {
      default: "Value is required",
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      value?.code &&
        updateProposal({
          ...newProposal,
          code: value.code,
        });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateProposal, newProposal]);

  return (
    <>
      <CreateProposalWrapper
        componentStep={CreateProposalStep.execution}
        title={
          <div className="flex items-center justify-center gap-x2">
            <span>Execution Code</span>
            <Button
              className="w-auto max-w-[initial] pl-0"
              theme="link"
              onClick={() => setShowExecutionExplanation(true)}
            >
              <HelpIcon height={20} width={20} />
            </Button>
          </div>
        }
        onPrev={() => setStep(CreateProposalStep.content)}
        onNext={isValid ? () => setStep(CreateProposalStep.preview) : undefined}
      >
        <div>
          <p className="font-size-x4 line-height-x5 ml-x7">
            Paste your governance proposal&apos;s execution code in the json
            formatting the field below. If the proposal has no required
            execution, an empty array or no input is valid. A default, empty
            transaction will be used.
          </p>
          <Textarea
            className="mt-x5 min-h-[266px]"
            form={{ ...register("code") }}
            id="code"
            error={
              errors.code?.message && (
                <div className="mt-x2 flex items-center gap-x2">
                  <span>{errors.code?.message}</span>
                  <Button
                    className="w-auto max-w-[initial] pl-0"
                    theme="link"
                    onClick={() => setShowExecutionExplanation(true)}
                  >
                    <HelpIcon height={20} width={20} />
                  </Button>
                </div>
              )
            }
            placeholder="Paste your code here"
          />
        </div>
      </CreateProposalWrapper>
      <ExecutionExplanationModal
        isOpen={showExecutionExplanation}
        onClose={() => setShowExecutionExplanation(false)}
      />
    </>
  );
};
