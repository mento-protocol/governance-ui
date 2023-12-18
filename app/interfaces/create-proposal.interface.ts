export interface CreateProposalForm {
    [CreateProposalFormStepEnum.wallet]: CreateProposalFormStep;
    [CreateProposalFormStepEnum.content]: CreateProposalFormStep;
}

interface CreateProposalFormStep {
    isValid: boolean;
    isEnable: boolean;
    value: { [key: string]: string }
}

export enum CreateProposalFormStepEnum {
    wallet = 'wallet',
    content = 'content'
}

export const initialCreateProposalForm: CreateProposalForm = {
    [CreateProposalFormStepEnum.wallet]: {
        isValid: false,
        isEnable: true,
        value: {}
    },
    [CreateProposalFormStepEnum.content]: {
        isValid: false,
        isEnable: false,
        value: {}
    }
}