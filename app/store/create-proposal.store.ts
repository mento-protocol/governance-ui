import {
  CreateProposalForm,
  CreateProposalFormStepEnum,
  createProposalFormStepOrder,
  getInitialCreateProposalForm,
} from "@interfaces/create-proposal.interface";
import { create } from "zustand";
import StringService from "@/app/helpers/string.service";
import { isAddress } from "viem";

const validateIsJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return false;
  }
};

const validateCode = (code: string) => {
  if (StringService.isNullOrEmpty(code)) {
    return undefined;
  }

  const json = validateIsJson(code);

  if (!validateIsJson(code)) {
    return "Invalid JSON format";
  }
  if (!Array.isArray(json)) {
    return "Value is not an array";
  }

  if (json.length === 0) {
    return "Array is empty";
  }
  if (
    !json.every((item) => {
      return (
        Object.hasOwn(item, "address") &&
        Object.hasOwn(item, "value") &&
        Object.hasOwn(item, "data") &&
        typeof item.address === "string" &&
        !isNaN(+item.value) &&
        typeof item.data === "string"
      );
    })
  ) {
    return "Elements have invalid format";
  }

  const invalidAddresses = json
    .map((item) => item.address)
    .filter((address) => !isAddress(address));
  if (invalidAddresses.length > 0) {
    return `Invalid address: ${invalidAddresses.join(", ")}`;
  }
  return undefined;
};

interface CreateProposalStore {
  form: CreateProposalForm;
  navigateInForm: (direction: "next" | "prev") => void;
  openedForm: CreateProposalFormStepEnum;
  executeJsonError: string | undefined;
  next: () => void;
  prev: () => void;
  start: () => void;
  validateExecuteJson: () => string | undefined;
  checkFormValidity: () => void;
  reset: (title: string, description: string, code: string) => void;
  patchWalletStep: (value: {
    balanceVeMENTO: bigint;
    balanceMENTO: bigint;
    walletAddress: string;
  }) => void;
  patchContentStep: (value: { title: string; description: string }) => void;
  patchExecutionStep: (value: { code: string }) => void;
}

export const useCreateProposalStore = create<CreateProposalStore>(
  (set, get) => {
    return {
      form: getInitialCreateProposalForm(),
      executeJsonError: undefined,
      next: () => {
        get().navigateInForm("next");
      },
      prev: () => {
        get().navigateInForm("prev");
      },
      start: () => {
        set({ openedForm: CreateProposalFormStepEnum.wallet });
      },
      checkFormValidity: () => {
        const form = get().form[get().openedForm];
        const isValid = Object.values(form.value).every((field) =>
          field.validate(field.value),
        );
        set({
          form: {
            ...get().form,
            [get().openedForm]: {
              ...form,
              isValid,
            },
          },
        });
      },
      navigateInForm: (direction: "next" | "prev") => {
        const openedIndex = createProposalFormStepOrder.indexOf(
          get().openedForm,
        );
        const nextFormKey =
          createProposalFormStepOrder[
            openedIndex + (direction === "next" ? 1 : -1)
          ];

        set({
          form: {
            ...get().form,
            [get().openedForm]: {
              ...get().form[get().openedForm],
              isOpened: false,
            },
            [nextFormKey]: {
              ...get().form[nextFormKey],
              isOpened: true,
            },
          },
          openedForm: nextFormKey,
        });
        get().checkFormValidity();
      },
      canGoNext: false,
      canGoPrev: false,
      openedForm: CreateProposalFormStepEnum.wallet,
      reset: (title: string, description: string, code: string) => {
        set({
          form: getInitialCreateProposalForm(title, description, code),
          openedForm: CreateProposalFormStepEnum.wallet,
        });
      },
      patchWalletStep: (value) => {
        set({
          form: {
            ...get().form,
            [CreateProposalFormStepEnum.wallet]: {
              isOpened: get().form[CreateProposalFormStepEnum.wallet].isOpened,
              isValid: get().form[CreateProposalFormStepEnum.wallet].isValid,
              value: {
                walletAddress: {
                  ...get().form[CreateProposalFormStepEnum.wallet].value
                    .walletAddress,
                  value: value.walletAddress,
                },
                balanceVeMENTO: {
                  ...get().form[CreateProposalFormStepEnum.wallet].value
                    .balanceVeMENTO,
                  value: value.balanceVeMENTO,
                },
                balanceMENTO: {
                  ...get().form[CreateProposalFormStepEnum.wallet].value
                    .balanceMENTO,
                  value: value.balanceMENTO,
                },
              },
            },
          },
        });
        get().checkFormValidity();
      },
      patchContentStep: (value) => {
        localStorage.setItem("proposalTitle", value.title);
        localStorage.setItem("proposalDescription", value.description);
        set({
          form: {
            ...get().form,
            [CreateProposalFormStepEnum.content]: {
              isOpened: get().form[CreateProposalFormStepEnum.content].isOpened,
              isValid: get().form[CreateProposalFormStepEnum.content].isValid,
              value: {
                ...get().form[CreateProposalFormStepEnum.content].value,
                title: {
                  ...get().form[CreateProposalFormStepEnum.content].value.title,
                  value: value.title,
                },
                description: {
                  ...get().form[CreateProposalFormStepEnum.content].value
                    .description,
                  value: value.description,
                },
              },
            },
          },
        });
        get().checkFormValidity();
      },
      patchExecutionStep: (value) => {
        localStorage.setItem("proposalCode", value.code);
        set({
          form: {
            ...get().form,
            [CreateProposalFormStepEnum.execution]: {
              isOpened:
                get().form[CreateProposalFormStepEnum.execution].isOpened,
              isValid: get().form[CreateProposalFormStepEnum.execution].isValid,
              value: {
                code: {
                  ...get().form[CreateProposalFormStepEnum.execution].value
                    .code,
                  value: value.code,
                },
              },
            },
          },
          executeJsonError: undefined,
        });
        get().checkFormValidity();
      },
      validateExecuteJson: () => {
        console.log("validateExecuteJson");
        set({
          executeJsonError: undefined,
        });
        const value =
          get().form[CreateProposalFormStepEnum.execution].value.code.value;
        const hasError = validateCode(value);
        set({
          executeJsonError: hasError,
        });
        return hasError;
      },
    };
  },
);
