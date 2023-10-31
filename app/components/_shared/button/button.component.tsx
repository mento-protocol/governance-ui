import styles from './button.module.scss';
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import Link from "next/link";
import {ReactNode} from "react";
import {ButtonType} from "@/app/types";

interface ButtonProps extends BaseComponentProps {
    theme?: ButtonType;
    type?: 'button' | 'submit' | 'reset';
    onClick?: (...args: any[]) => any;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
    block?: boolean;
    disabled?: boolean;
}

export const Button = ({
                           children,
                           theme = 'primary',
                           onClick,
                           className,
                           style,
                           type = 'button',
                           href,
                           target = '_self',
                           block,
                           disabled
                       }: ButtonProps) => {

    const Wrapper = ({children}: { children: ReactNode }) => {
        return href ? <Link href={href} target={target} className={classNames(block && styles.block)}>
            {children}
        </Link> : <div className={classNames(block && styles.block)}>{children}</div>
    }

    return (
        <Wrapper>
            <div
                className={classNames(styles.wrapper, styles[theme], className, block && styles.block, disabled && styles.disabled)}
                style={style}>
                <button type={type} className={classNames(styles.button)} onClick={onClick}>
                    <span className={styles.inner}>
                        {children}
                    </span>
                </button>
            </div>
        </Wrapper>
    );
}