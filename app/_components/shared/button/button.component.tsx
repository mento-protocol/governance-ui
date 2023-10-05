import styles from './button.module.scss';
import classNames from "classnames";

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | 'clear';
interface ButtonProps {
    children: React.ReactNode;
    type?: ButtonType;
}

export const Button = ({children, type = 'primary'} : ButtonProps) => {
    return <div className={classNames(styles.wrapper, styles[type])}>
        <button className={classNames(styles.button)}>
            {children}
        </button>
    </div>
}