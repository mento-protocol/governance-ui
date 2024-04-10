"use client";
import { useEffect } from "react";
import { object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, MarkdownEditor } from "@/components/_shared";
import {
  CreateProposalStep,
  useCreateProposal,
} from "../create-proposal-provider";
import { CreateProposalWrapper } from "../create-proposal-wrapper/create-proposal-wrapper.component";

export const CreateProposalContentStep = () => {
  const { setStep, updateProposal, newProposal } = useCreateProposal();

  const validationSchema = object().shape({
    title: string().required("Please add a title").typeError("Invalid title"),
    description: string()
      .required("Please add a description")
      .typeError("Invalid description"),
  });

  const {
    register,
    watch,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    shouldFocusError: true,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      title: newProposal.title,
      description: newProposal.title,
    },
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
        description: value.description || "",
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
        <p className="mt-4 font-semibold">Description</p>
        <p className="mt-4">
          Proposal description can be written as plain text or formatted with{" "}
          <span className="font-semibold">Markdown.</span>
        </p>
        <MarkdownEditor
          className="mt-4"
          value={watch("description", newProposal.description)}
          error={errors.title?.message}
          markdownChanged={(value) => {
            setValue("description", value);
            trigger("description");
          }}
        />
      </div>
    </CreateProposalWrapper>
  );
};
