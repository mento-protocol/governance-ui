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
    wrapperClassName?: string
}

type WrapperProps = {
    children: ReactNode,
    href?: string,
    target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
    block?: boolean,
    wrapperClassName?: string
}

const Wrapper = ({children, href, target, block, wrapperClassName}: WrapperProps) => {
    return href ? <Link href={href} target={target} className={classNames(wrapperClassName, block && styles.block)}>
        {children}
    </Link> : <div className={classNames(wrapperClassName, block && styles.block)}>{children}</div>
}

export const Button = ({
                           children,
                           theme = 'primary',
                           onClick,
                           className,
                           wrapperClassName,
                           style,
                           type = 'button',
                           href,
                           target = '_self',
                           block,
                           disabled
                       }: ButtonProps) => {

    return (
        <Wrapper href={href} target={target} block={block} wrapperClassName={wrapperClassName}>
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