import {ValidatorFunction} from "@interfaces/form.interface";

export default abstract class Validators {
    public static required(): ValidatorFunction {
        return (value: string | number) => !!value ? "" : "This field is required";
    }

    public static email(): ValidatorFunction {
        return (value: string | number) =>  /^.+@.+\..+$/.test(value.toString()) ? "" : "Invalid email address";
    }

    public static url(): ValidatorFunction {
        return (value: string | number) =>  /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/.test(value.toString()) ? "" : "Invalid URL";
    }

    public static guid(): ValidatorFunction {
        return (value: string | number) =>  /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(value.toString()) ? "" : "Invalid GUID";
    }

    public static number(): ValidatorFunction {
        return (value: string | number) =>  !isNaN(+value) ? "" : "Invalid number";
    }

    public static minLength(length: number): ValidatorFunction {
        return (value: string | number) =>  value.toString().length >= length ? "" : `Minimum length is ${length}`;
    }

    public static maxLength(length: number): ValidatorFunction {
        return (value: string | number) =>  value.toString().length <= length ? "" : `Maximum length is ${length}`;
    }

    public static min(min: number): ValidatorFunction {
        return (value: string | number) =>  +value >= min ? "" : `Minimum value is ${min}`;
    }

    public static max(max: number): ValidatorFunction {
        return (value: string | number) => +value <= max ? "" : `Maximum value is ${max}`;
    }
}