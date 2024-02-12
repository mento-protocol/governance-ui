"use client";
import { Input, MarkdownEditor } from "@components/_shared";
import { InferType, object, setLocale, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useCreateProposalStore } from "@/app/store";
import { useEffect } from "react";

const formStep = CreateProposalFormStepEnum.content;

export const CreateProposalContentStep = () => {
  const { form, next, prev } = useCreateProposalStore();

  return (
    <Wrapper
      step={formStep}
      isOpened={form[formStep].isOpened}
      canGoNext={form[formStep].isValid}
      next={next}
      prev={prev}
      title="Add name and description"
    >
      {form[formStep].isOpened && <InnerForm />}
    </Wrapper>
  );
};

const validationSchema = object({
  title: string().required().typeError("Invalid title"),
  content: string().required().typeError("Invalid description"),
});

type FormData = InferType<typeof validationSchema>;

const InnerForm = () => {
  const { patchContentStep, form, next, prev } = useCreateProposalStore();

  console.log(
    "CreateProposalContentStep",
    form[formStep].value.title.value,
    form[formStep].value.description.value,
  );

  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      title: form[formStep].value.title.value,
      content: form[formStep].value.description.value,
    },
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
      patchContentStep({
        title: value.title || "",
        description: value.content || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, patchContentStep]);

  return (
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
  );
};
