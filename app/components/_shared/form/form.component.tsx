import styles from './form.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {FormController} from '@interfaces/form.interface';
import classNames from "classnames";
import {useEffect} from "react";

interface FormProps extends BaseComponentProps {
    form: FormController;
    validateCallback?: (valid: boolean) => void;
}


export const Form = ({children, className, style, form}: FormProps) => {

    useEffect(() => {

    }, [form.fields]);

    return <form className={classNames(styles.form, className)} style={style}>
        {children}
    </form>
}