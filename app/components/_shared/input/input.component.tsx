import styles from './input.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {ReactNode, useEffect, useState} from "react";
import {ValidatorFunction} from "@/app/helpers/validators.service";

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
                      }: InputProps) => {
    const idInternal = id || Math.floor(Math.random() * 1000).toString();
    const [internalValue, setInternalValue] = useState(value);
    const [initialValue, setInitialValue] = useState(value);
    const [touched, setTouched] = useState(false);
    const [dirty, setDirty] = useState(false);


    useEffect(() => {
        if (value !== internalValue) {
            setInternalValue(value);
            setInitialValue(value);
            setDirty(false);
            setTouched(false);
        }
    }, [value]);

    useEffect(() => {
        setTouched(true);

        if (internalValue !== initialValue) {
            setDirty(true);
        }



    }, [internalValue]);


    const valueChanged = (e: any) => {
        onChange(e.target.value);
    }

    return <div className={classNames(styles.wrapper, className)}>
        {!!label && <label htmlFor={idInternal}>
            {label}
        </label>}
        <div className={classNames(styles.input)}>
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

    </div>
}