import styles from './button.module.scss';
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | 'clear';
interface ButtonProps extends BaseComponentProps {
    children: React.ReactNode;
    type?: ButtonType;
    onClick?: (...args: unknown[]) => unknown;
}

export const Button = ({children, type = 'primary', onClick, className, style} : ButtonProps) => {
    return <div className={classNames(styles.wrapper, styles[type], className)} style={style}>
        <button className={classNames(styles.button)} onClick={onClick}>
            {children}
        </button>
    </div>
}