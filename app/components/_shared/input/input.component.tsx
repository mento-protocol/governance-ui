import styles from './input.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {ReactNode} from "react";

interface InputProps extends BaseComponentProps {
    label?: string;
    id: string;
    type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
    placeholder?: string;
    error?: string;
    form: any;
    addon?: ReactNode;
    compact?: boolean;
}

export const Input = ({
                          label,
                          id,
                          type,
                          placeholder,
                          className,
                          form,
                          addon,
                          error,
                          compact
                      }: InputProps) => {
    const idInternal = id || Math.floor(Math.random() * 1000).toString();

    return <div className={classNames(styles.wrapper, compact && styles.compact, className)}>
        {!!label && <label htmlFor={idInternal}>
            {label}
        </label>}
        <div className={classNames(styles.input, !!error && styles.error)}>
            <input id={idInternal}
                   placeholder={placeholder}
                   type={type}
                   {...form}/>
            {addon}
        </div>
        {!!error && <div className={styles.errorMessage}>{error}</div>}
    </div>
}