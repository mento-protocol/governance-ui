"use client";
import { useEffect } from "react";
import { object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, MarkdownEditor } from "@/components/_shared";
import CreateProposalWrapper from "@/components/create-proposal/create-proposal-wrapper/create-proposal-wrapper.component";
import {
  CreateProposalStep,
  useCreateProposal,
} from "@/components/create-proposal/create-proposal-provider";

const validationSchema = object().shape({
  title: string().required().typeError("Invalid title"),
  content: string().required().typeError("Invalid description"),
});

export const CreateProposalContentStep = () => {
  const { setStep, updateProposal, newProposal } = useCreateProposal();

  const {
    register,
    watch,
    setValue,
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
      updateProposal({
        title: value.title || "",
        description: value.content || "",
        code: newProposal.code,
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, updateProposal, newProposal.code, isValid]);

  return (
    <CreateProposalWrapper
      componentStep={CreateProposalStep.content}
      title="Add name and description"
      onPrev={() => setStep(CreateProposalStep.wallet)}
      onNext={isValid ? () => setStep(CreateProposalStep.execution) : undefined}
    >
      <div>
        <p className="font-size-x4 line-height-x5 mb-4 ml-x7">
          Give your proposal a title and a description. They will be public when
          your proposal goes live.
        </p>
        <Input
          label="Title"
          type="text"
          form={{ ...register("title") }}
          id="proposal-title"
          error={errors.title?.message}
          placeholder="Enter a title for your proposal"
        />
        <MarkdownEditor
          className="mt-4"
          value={watch("content")}
          markdownChanged={(value) => setValue("content", value)}
        />
      </div>
    </CreateProposalWrapper>
  );
};
