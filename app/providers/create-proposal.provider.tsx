import {createContext, ReactNode, useContext, useState} from "react";
import {
    CreateProposalForm,
    CreateProposalFormStepEnum,
    initialCreateProposalForm
} from "@interfaces/create-proposal.interface";

const CreateProposalContext = createContext({
    form: initialCreateProposalForm as CreateProposalForm,
    setIsValid: (step: CreateProposalFormStepEnum, value: boolean) => {
    },
    setIsEnabled: (step: CreateProposalFormStepEnum, value: boolean) => {
    }
});
export const CreateProposalProvider = ({children}: { children: ReactNode }) => {

    const [form, setForm] = useState(initialCreateProposalForm);

    const setIsValid = (step: CreateProposalFormStepEnum, value: boolean) => {
        const stepValue = form[step];
        setForm({
            ...form, [step]: {
                ...stepValue,
                isValid: value
            }
        });
    }

    const setIsEnabled = (step: CreateProposalFormStepEnum, value: boolean) => {
        const stepValue = form[step];
        setForm({
            ...form, [step]: {
                ...stepValue,
                isEnabled: value
            }
        });
    }

    return <CreateProposalContext.Provider value={{
        form,
        setIsValid,
        setIsEnabled
    }}>
        {children}
    </CreateProposalContext.Provider>
}

export const useCreateProposalContext = () => {
    return useContext(CreateProposalContext);
}