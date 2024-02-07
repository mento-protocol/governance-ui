import {
  CreateProposalForm,
  CreateProposalFormStepEnum,
  createProposalFormStepOrder,
  initialCreateProposalForm,
  WalletProposalForm,
} from "@interfaces/create-proposal.interface";
import { create } from "zustand";

interface CreateProposalStore {
  form: CreateProposalForm;
  navigateInForm: (direction: "next" | "prev") => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  openedForm: CreateProposalFormStepEnum;

  next: () => void;
  prev: () => void;
  save: () => void;
  checkFormValidity: () => void;
  checkNavigateValidity: () => void;
  reset: () => void;
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
      form: initialCreateProposalForm,
      next: () => {
        if (!get().canGoNext || !get().form[get().openedForm].isValid) {
          return;
        }
        get().navigateInForm("next");
      },
      prev: () => {
        if (!get().canGoPrev) {
          return;
        }
        get().navigateInForm("prev");
      },
      save: () => {},
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
        get().checkNavigateValidity();
      },
      canGoNext: false,
      canGoPrev: false,
      openedForm: CreateProposalFormStepEnum.wallet,
      checkNavigateValidity: () => {
        set({
          ...get(),
          canGoNext:
            get().openedForm !== CreateProposalFormStepEnum.preview &&
            get().form[get().openedForm].isValid,
          canGoPrev: get().openedForm !== CreateProposalFormStepEnum.wallet,
        });
      },
      reset: () => {
        set({
          form: initialCreateProposalForm,
          canGoNext: false,
          canGoPrev: false,
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
        get().checkNavigateValidity();
      },
      patchContentStep: (value) => {
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
        get().checkNavigateValidity();
      },
      patchExecutionStep: (value) => {
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
        });
        get().checkFormValidity();
        get().checkNavigateValidity();
      },
    };
  },
);
