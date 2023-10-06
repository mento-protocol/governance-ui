import styles from './button.module.scss';
import classNames from "classnames";

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | 'clear';
interface ButtonProps {
    children: React.ReactNode;
    type?: ButtonType;
    onClick: (...args: unknown[]) => unknown;
}

export const Button = ({children, type = 'primary', onClick} : ButtonProps) => {
    return <div className={classNames(styles.wrapper, styles[type])}>
        <button className={classNames(styles.button)} onClick={onClick}>
            {children}
        </button>
    </div>
}