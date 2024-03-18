import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useCreateProposalOnChain from "@lib/contracts/governor/useCreateProposalOnChain";

export enum CreateProposalStep {
  wallet = 1,
  content = 2,
  execution = 3,
  preview = 4,
}

type CreateProposalForm = {
  title: string;
  description: string;
  code: string;
};

export interface ICreateProposalContext {
  step: CreateProposalStep;
  setStep: (step: CreateProposalStep) => void;
  newProposal: CreateProposalForm;
  updateProposal: (updatedProposal: CreateProposalForm) => void;
  submitProposal: () => void;
}

const CreateProposalContext = createContext<ICreateProposalContext | undefined>(
  undefined,
);

interface ICreateProposalProvider {
  children: ReactNode | ReactNode[];
}

export const CreateProposalProvider = ({
  children,
}: ICreateProposalProvider) => {
  const freshProposal = {
    description: "",
    title: "",
    code: "",
  };

  const [step, setStep] = useState<CreateProposalStep>(
    CreateProposalStep.wallet,
  );
  const { createProposal } = useCreateProposalOnChain();

  const [newProposal, updateProposal] = useState(freshProposal);

  const submitProposal = useCallback(() => {
    let transactions = [];
    try {
      transactions = JSON.parse(newProposal.code);
    } catch (e) {}

    if (transactions.length === 0) {
      transactions = [
        {
          address: "0x0000000000000000000000000000000000000000",
          value: 0,
          data: "0x",
        },
      ];
    }
    createProposal({
      metadata: {
        title: newProposal.title,
        description: newProposal.description,
      },
      transactions,
    });
  }, [createProposal, newProposal]);

  return (
    <CreateProposalContext.Provider
      value={{
        step,
        setStep,
        newProposal,
        updateProposal,
        submitProposal,
      }}
    >
      {children}
    </CreateProposalContext.Provider>
  );
};

export function useCreateProposal() {
  const context = useContext(CreateProposalContext);
  if (context === undefined) {
    throw new Error(
      "useCreateProposal must be used within a CreateProposalProvider",
    );
  }
  return context;
}
