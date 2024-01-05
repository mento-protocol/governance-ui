export interface CreateProposalForm {
    [CreateProposalFormStepEnum.wallet]: CreateProposalFormStep;
    [CreateProposalFormStepEnum.content]: CreateProposalFormStep;
    [CreateProposalFormStepEnum.execution]: CreateProposalFormStep;
    [CreateProposalFormStepEnum.preview]: CreateProposalFormStep;
}

interface CreateProposalFormStep {
    isValid: boolean;
    isEnabled: boolean;
    isOpened: boolean;
    value: { [key: string]: string }
}

export enum CreateProposalFormStepEnum {
    wallet = 'wallet',
    content = 'content',
    execution = 'execution',
    preview = 'preview'
}

const nextFormStep = {
    isValid: false,
    isEnabled: false,
    isOpened: false,
    value: {}
};

export const initialCreateProposalForm: CreateProposalForm = {
    [CreateProposalFormStepEnum.wallet]: {
        isValid: false,
        isOpened: true,
        isEnabled: true,
        value: {}
    },
    [CreateProposalFormStepEnum.content]: nextFormStep,
    [CreateProposalFormStepEnum.execution]: nextFormStep,
    [CreateProposalFormStepEnum.preview]: nextFormStep
}