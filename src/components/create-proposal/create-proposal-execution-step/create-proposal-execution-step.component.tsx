"use client";
import { useEffect } from "react";
import { object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Textarea } from "@/components/_shared";
import CreateProposalWrapper from "@/components/create-proposal/create-proposal-wrapper/create-proposal-wrapper.component";
import {
  CreateProposalStep,
  useCreateProposal,
} from "@/components/create-proposal/create-proposal-provider";

const validationSchema = object().shape({
  code: string()
    .test("json", "Invalid JSON format", (value) => {
      if (!value) return true;

      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return false;
      }
    })
    .typeError("Invalid code"),
});

export const CreateProposalExecutionStep = () => {
  const { setStep, newProposal, updateProposal } = useCreateProposal();

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
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
    <CreateProposalWrapper
      componentStep={CreateProposalStep.execution}
      title="Execution Code"
      onPrev={() => setStep(CreateProposalStep.content)}
      onNext={isValid ? () => setStep(CreateProposalStep.preview) : undefined}
    >
      <div>
        <p className="font-size-x4 line-height-x5 ml-x7">
          Paste your governance proposal&apos;s execution code in the json
          format in the field below:
        </p>
        <Textarea
          className="mb-x5 mt-x5 min-h-[266px]"
          form={{ ...register("code") }}
          id="code"
          error={errors.code?.message}
          placeholder="Paste your code here"
        />
      </div>
    </CreateProposalWrapper>
  );
};
