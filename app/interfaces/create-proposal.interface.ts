import { addWeeks } from "date-fns";

export enum CreateProposalFormStepEnum {
  wallet = "wallet",
  content = "content",
  execution = "execution",
  preview = "preview",
}

export interface CreateProposalForm {
  [CreateProposalFormStepEnum.wallet]: CreateProposalFormStep<WalletProposalForm>;
  [CreateProposalFormStepEnum.content]: CreateProposalFormStep<WalletContentForm>;
  [CreateProposalFormStepEnum.execution]: CreateProposalFormStep<WalletExecutionForm>;
  [CreateProposalFormStepEnum.preview]: CreateProposalFormStep<WalletPreviewForm>;
}

export interface FormField<T> {
  value: T;
  validate: (value: any) => boolean;
}

export interface CreateProposalFormStep<T> {
  isOpened: boolean;
  value: T;
  isValid: boolean;
}

export interface WalletProposalForm {
  walletAddress: FormField<string>;
  balanceVeMENTO: FormField<number>;
  balanceMENTO: FormField<number>;
}

export interface WalletContentForm {
  title: FormField<string>;
  description: FormField<string>;
}

export interface WalletExecutionForm {
  code: FormField<string>;
}

export interface WalletPreviewForm {}

const isNullOrWhitespace = (input: string) => {
  return !input || !input.trim();
};

export const initialCreateProposalForm: CreateProposalForm = {
  [CreateProposalFormStepEnum.wallet]: {
    value: {
      walletAddress: {
        value: "",
        validate: (value: string) => !isNullOrWhitespace(value),
      },
      balanceMENTO: {
        value: 0,
        validate: (value: number) => value > 10,
      },
      balanceVeMENTO: {
        value: 0,
        validate: (value: number) => value > 2500,
      },
    },
    isOpened: true,
    isValid: false,
  },
  [CreateProposalFormStepEnum.content]: {
    value: {
      title: {
        value: "",
        validate: (value: string) => !isNullOrWhitespace(value),
      },
      description: {
        value: "",
        validate: (value: string) => !isNullOrWhitespace(value),
      },
    },
    isOpened: false,
    isValid: false,
  },

  [CreateProposalFormStepEnum.execution]: {
    value: {
      code: {
        value: "",
        validate: (value: string) => true,
      },
    },
    isOpened: false,
    isValid: false,
  },

  [CreateProposalFormStepEnum.preview]: {
    value: {},
    isOpened: false,
    isValid: false,
  },
};

export const createProposalFormStepOrder = [
  CreateProposalFormStepEnum.wallet,
  CreateProposalFormStepEnum.content,
  CreateProposalFormStepEnum.execution,
  CreateProposalFormStepEnum.preview,
];
