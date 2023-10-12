import styles from './button.module.scss';
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import Link from "next/link";

type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'link' | 'clear';

interface ButtonProps extends BaseComponentProps {
    children: React.ReactNode;
    type?: ButtonType;
    onClick?: (...args: unknown[]) => unknown;
    href?: string;
}

export const Button = ({children, type = 'primary', onClick, className, style, href}: ButtonProps) => {

    const Wrapper = ({children}: { children: React.ReactNode }) => {
        return href ? <Link href={href}>
            {children}
        </Link> : <>{children}</>
    }

    return (
        <Wrapper>
            <div className={classNames(styles.wrapper, styles[type], className)} style={style}>
                <button className={classNames(styles.button)} onClick={onClick}>
                    {children}
                </button>
            </div>
        </Wrapper>
    );
}