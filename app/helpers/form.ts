export type ValidatorFunction = (value: string | number) => string;

export class Form {

}

export interface Field {
    value: any;
    validators: ValidatorFunction[];
}