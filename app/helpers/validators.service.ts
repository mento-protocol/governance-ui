
export type ValidatorFunction = (...args: any[]) => string;

export default abstract class ValidatorsService {
    public static required(): ValidatorFunction {
        return () => !!this ? "" : "This field is required";
    }

    public static email(): ValidatorFunction {
        return () =>  /^.+@.+\..+$/.test(this.toString()) ? "" : "Invalid email address";
    }

    public static url(): ValidatorFunction {
        return () =>  /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/.test(this.toString()) ? "" : "Invalid URL";
    }

    public static guid(): ValidatorFunction {
        return () =>  /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i.test(this.toString()) ? "" : "Invalid GUID";
    }

    public static number(): ValidatorFunction {
        return () =>  !isNaN(+this) ? "" : "Invalid number";
    }

    public static minLength(length: number): ValidatorFunction {
        return () =>  this.toString().length >= length ? "" : `Minimum length is ${length}`;
    }

    public static maxLength(length: number): ValidatorFunction {
        return () =>  this.toString().length <= length ? "" : `Maximum length is ${length}`;
    }

    public static min(min: number): ValidatorFunction {
        return () =>  +this >= min ? "" : `Minimum value is ${min}`;
    }

    public static max(max: number): ValidatorFunction {
        return () =>  +this <= max ? "" : `Maximum value is ${max}`;
    }

   public static validate(validators: ValidatorFunction[]): string[] {
        return validators.map(validator => validator(this)).filter(error => !!error);
   }
}