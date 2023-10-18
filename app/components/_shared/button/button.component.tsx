import styles from './button.module.scss';
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import Link from "next/link";
import {ReactNode} from "react";
import {ButtonType} from "@/app/types";

interface ButtonProps extends BaseComponentProps {
    type?: ButtonType;
    onClick?: (...args: unknown[]) => unknown;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
    block?: boolean;
}

export const Button = ({
                           children,
                           type = 'primary',
                           onClick,
                           className,
                           style,
                           href,
                           target = '_self',
                           block
                       }: ButtonProps) => {

    const Wrapper = ({children}: { children: ReactNode }) => {
        return href ? <Link href={href} target={target} className={classNames(block && styles.block)}>
            {children}
        </Link> : <div className={classNames(block && styles.block)}>{children}</div>
    }

    return (
        <Wrapper>
            <div className={classNames(styles.wrapper, styles[type], className, block && styles.block)} style={style}>
                <button className={classNames(styles.button)} onClick={onClick}>
                    <div className={styles.inner}>
                        {children}
                    </div>
                </button>
            </div>
        </Wrapper>
    );
}