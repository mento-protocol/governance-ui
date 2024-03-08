"use client";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import styles from "./create-proposal-execution-step.module.scss";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useForm } from "react-hook-form";
import { Button, Textarea } from "@components/_shared";
import { useCreateProposalStore } from "@/app/store";
import { useEffect } from "react";
import classNames from "classnames";
import { HelpIcon } from "@components/_icons";
import useModal from "@/app/providers/modal.provider";
import { ExecutionExplanationModal } from "@components/create-proposal";

type FormData = {
  code: string;
};

export const CreateProposalExecutionStep = () => {
  const { patchExecutionStep, form, next, prev, validateExecuteJson } =
    useCreateProposalStore();
  const { showModal } = useModal();

  const validateAndGoNext = () => {
    const hasErrors = validateExecuteJson();
    if (!hasErrors) {
      next();
    }
  };

  return (
    <Wrapper
      step={CreateProposalFormStepEnum.execution}
      isOpened={form[CreateProposalFormStepEnum.execution].isOpened}
      canGoNext={form[CreateProposalFormStepEnum.execution].isValid}
      next={validateAndGoNext}
      prev={prev}
      title={
        <div className="flex gap-x2 justify-center items-center">
          <span>Execution Code</span>
          <Button
            theme="link"
            onClick={() =>
              showModal(<ExecutionExplanationModal />, {
                title: "The execution code must follow these rules:",
              })
            }
          >
            <HelpIcon height={20} width={20} />
          </Button>
        </div>
      }
    >
      {form[CreateProposalFormStepEnum.execution].isOpened && <InnerForm />}
    </Wrapper>
  );
};

const InnerForm = () => {
  const { patchExecutionStep, form, executeJsonError } =
    useCreateProposalStore();

  const {
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      code: form[CreateProposalFormStepEnum.execution].value.code.value,
    },
    mode: "all",
  });

  useEffect(() => {
    if (executeJsonError) {
      setError("code", {
        type: "manual",
        message: executeJsonError,
      });
    } else {
      clearErrors("code");
    }
  }, [clearErrors, executeJsonError, setError]);

  useEffect(() => {
    const subscription = watch((value) => {
      patchExecutionStep({
        code: value.code || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, patchExecutionStep]);
  return (
    <div>
      <p className="font-size-x4 line-height-x5 ml-x7">
        Paste your governance proposal’s execution code in the json format in
        the field below:
      </p>
      <Textarea
        className={classNames(
          styles.executionInput,
          "mt-x5 mb-x5 min-h-[266px]",
        )}
        form={{ ...register("code") }}
        id="code"
        error={errors.code?.message}
        placeholder="Enter your code"
      />
    </div>
  );
};
