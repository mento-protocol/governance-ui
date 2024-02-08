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
import StringService from "@/app/helpers/string.service";
import { isAddress } from "viem";
import useModal from "@/app/providers/modal.provider";
import { ExecutionExplanationModal } from "@components/create-proposal";

type FormData = {
  code: string;
};

const formStep = CreateProposalFormStepEnum.execution;

export const CreateProposalExecutionStep = () => {
  const { patchExecutionStep, form, next, prev } = useCreateProposalStore();
  const { showModal } = useModal();
  const {
    register,
    watch,
    setError,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "all",
  });

  const validateIsJson = (value: string) => {
    try {
      const json = JSON.parse(value);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateCode = (code: string) => {
    if (StringService.isNullOrEmpty(code)) {
      return true;
    }

    if (!validateIsJson(code)) {
      setError("code", {
        type: "manual",
        message: "Invalid JSON format",
      });
      return false;
    }
    const json = JSON.parse(code);
    if (!Array.isArray(json)) {
      setError("code", {
        type: "manual",
        message: "Value is not an array",
      });
      return false;
    }

    if (json.length === 0) {
      setError("code", {
        type: "manual",
        message: "Array is empty",
      });
      return false;
    }
    if (
      !json.every((item) => {
        return (
          Object.hasOwn(item, "address") &&
          Object.hasOwn(item, "value") &&
          Object.hasOwn(item, "data")
        );
      })
    ) {
      setError("code", {
        type: "manual",
        message: "Elements have invalid format",
      });
      return false;
    }

    const invalidAddresses = json
      .map((item) => item.address)
      .filter((address) => !isAddress(address));
    if (invalidAddresses.length > 0) {
      setError("code", {
        type: "manual",
        message: `Invalid address: ${invalidAddresses.join(", ")}`,
      });
      return false;
    }
    return true;
  };

  const validateAndGoNext = () => {
    const code = getValues("code");
    console.log("code", code);
    const isValid = validateCode(code);
    console.log("isValid", isValid);
    if (isValid) {
      next();
    }
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log("watch", value.code);
      patchExecutionStep({
        code: value.code || "",
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, patchExecutionStep]);

  return (
    <Wrapper
      step={formStep}
      isOpened={form[formStep].isOpened}
      canGoNext={form[formStep].isValid}
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
    </Wrapper>
  );
};
