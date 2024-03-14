"use client";
import { useEffect } from "react";
import { InferType, object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { Textarea } from "@components/_shared";
import { useCreateProposalStore } from "@lib/store";

const validationSchema = object({
  code: string().required().typeError("Invalid code"),
});

type FormData = InferType<typeof validationSchema>;

const formStep = CreateProposalFormStepEnum.execution;

export const CreateProposalExecutionStep = () => {
  const { patchExecutionStep } = useCreateProposalStore();

  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
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
      patchExecutionStep({
        code: value.code || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, patchExecutionStep]);

  return (
    <Wrapper step={formStep} title="Execution Code">
      <div>
        <p className="font-size-x4 line-height-x5 ml-x7">
          Paste your governance proposal’s execution code in the json format in
          the field below:
        </p>
        <Textarea
          className="mt-x5 mb-x5 min-h-[266px]"
          form={{ ...register("code") }}
          id="code"
          error={errors.code?.message}
          placeholder="Paste your code here"
        />
      </div>
    </Wrapper>
  );
};
