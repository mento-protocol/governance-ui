export interface CreateProposalForm {
    [CreateProposalFormStepEnum.wallet]: CreateProposalFormStep;
    [CreateProposalFormStepEnum.content]: CreateProposalFormStep;
}

interface CreateProposalFormStep {
    isValid: boolean;
    isEnabled: boolean;
    isOpened: boolean;
    value: { [key: string]: string }
}

export enum CreateProposalFormStepEnum {
    wallet = 'wallet',
    content = 'content'
}

export const initialCreateProposalForm: CreateProposalForm = {
    [CreateProposalFormStepEnum.wallet]: {
        isValid: false,
        isOpened: true,
        isEnabled: true,
        value: {}
    },
    [CreateProposalFormStepEnum.content]: {
        isValid: false,
        isEnabled: false,
        isOpened: false,
        value: {}
    }
}