"use client";
import styles from './input.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {ReactNode, useEffect, useState} from "react";
import {ValidatorFunction} from "@interfaces/form.interface";

interface InputProps extends BaseComponentProps {
    label?: string;
    id: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    name?: string;
    placeholder?: string;
    value: string | number;
    onChange: any;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    unit?: string;
    max?: number;
    min?: number;
    addon?: string | ReactNode;
    validators?: ValidatorFunction[];
}

export const Input = ({
                          label,
                          id,
                          type,
                          name,
                          placeholder,
                          value,
                          onChange,
                          required,
                          max,
                          min,
                          unit,
                          error,
                          errorMessage,
                          className,
                          validators
                      }: InputProps) => {
    const idInternal = id || Math.floor(Math.random() * 1000).toString();
    const [initialValue, setInitialValue] = useState(value);
    const [touched, setTouched] = useState(false);
    const [errors, setErrors] = useState([] as string[]);

    const validate = (value: string | number) => {
        const errors = validators?.map(validator => validator(value)).filter(error => !!error) || [];
        console.log(value, errors, errors?.[0]);
        setErrors(errors);
    }

    const valueChanged = (e: any) => {
        setTouched(true);
        validate(e.target.value);
        onChange(e.target.value);
    }

    return <div className={classNames(styles.wrapper, !!error && styles.error, className)}>
        {!!label && <label htmlFor={idInternal}>
            {label}
        </label>}
        <div className={classNames(styles.input, touched && (!!error || !!errors.length) && styles.error)}>
            <input id={idInternal}
                   name={name}
                   placeholder={placeholder}
                   value={value}
                   onChange={valueChanged}
                   required={required}
                   type={type}/>
            {!!max && <div className={styles.addon}>
                <div className="flex justify-between">
                    <div className="underline">Max available</div>
                    <div>{max} {unit}</div>
                </div>
            </div>
            }
        </div>

        {!!error && <div className={styles.errorMessage}>{errorMessage}</div>}
        {!error && <div className={styles.errorMessage}>{errors?.[0]}</div>}

    </div>
}