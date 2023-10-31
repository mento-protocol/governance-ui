export type ValidatorFunction = (value: string | number) => string;
export class FormController {
    fields: FormField[];

    constructor(fields: FormField[]) {
        this.fields = fields;
    }


}

export interface FormField {
    value: any;
    validators: ValidatorFunction[];
}