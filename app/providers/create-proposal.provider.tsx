import {createContext, ReactNode, useContext, useState} from "react";
import {
    CreateProposalForm,
    CreateProposalFormStepEnum,
    initialCreateProposalForm
} from "@interfaces/create-proposal.interface";

const noopProposalMethod = (step: CreateProposalFormStepEnum, ...args: any[]) => { };

const CreateProposalContext = createContext({
    form: initialCreateProposalForm as CreateProposalForm,
    setIsValid: noopProposalMethod,
    setIsEnabled: noopProposalMethod,
    toggleStepOpen: noopProposalMethod
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

    const toggleStepOpen = (step: CreateProposalFormStepEnum) => {
        const stepValue = form[step];
        setForm({
            ...form, [step]: {
                ...stepValue,
                isOpened: !stepValue.isOpened
            }
        });
    }

    return <CreateProposalContext.Provider value={{
        form,
        setIsValid,
        setIsEnabled,
        toggleStepOpen
    }}>
        {children}
    </CreateProposalContext.Provider>
}

export const useCreateProposalContext = () => {
    return useContext(CreateProposalContext);
}