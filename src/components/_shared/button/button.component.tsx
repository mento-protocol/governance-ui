import { ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { ButtonType } from "@/lib/types";
import styles from "./button.module.scss";

interface ButtonProps extends BaseComponentProps {
  theme?: ButtonType;
  type?: "button" | "submit" | "reset";
  onClick?: (...args: any[]) => any;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
  block?: boolean;
  disabled?: boolean;
  wrapperClassName?: string;
}

type WrapperProps = {
  children: ReactNode;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
  block?: boolean;
  wrapperClassName?: string;
  disabled?: boolean;
};

const Wrapper = ({
  children,
  href,
  target,
  block,
  wrapperClassName,
  disabled,
}: WrapperProps) => {
  return (
    <div className={classNames(disabled && styles.disabled)}>
      {href ? (
        <Link
          href={href}
          target={target}
          className={classNames(
            wrapperClassName,
            block && styles.block,
            disabled && styles.disabled,
          )}
        >
          {children}
        </Link>
      ) : (
        <div
          className={classNames(
            wrapperClassName,
            block && styles.block,
            disabled && styles.disabled,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// TODO: Button needs to be completely redone styling wise

export const Button = ({
  children,
  theme = "primary",
  onClick,
  className,
  wrapperClassName,
  style,
  type = "button",
  href,
  target = "_self",
  block,
  disabled,
}: ButtonProps) => {
  return (
    <Wrapper
      href={href}
      target={target}
      block={block}
      wrapperClassName={wrapperClassName}
      disabled={disabled}
    >
      <div
        className={classNames(
          styles.wrapper,
          styles[theme],
          className,
          block && styles.block,
          disabled && styles.disabled,
        )}
        style={style}
      >
        <button
          type={type}
          // TODO: Button styles to be fixed
          // color: $foreground-color;
          // background-color: $background-color;
          // border-color: $c-black;

          // &:hover {
          //   margin-top: -8px;
          //   color: $foreground-color;
          // }

          // &:active {
          //   margin-top: -2px;
          //   color: $foreground-color;
          // }

          // @media (hover: none) {
          //   &:active,
          //   &:focus {
          //     animation: button-click-animation 0.45s $ease-out-back;
          //   }
          // }
          className={classNames(styles.button)}
          onClick={onClick}
        >
          <span className={styles.inner}>{children}</span>
          {/* <span className="flex justify-center items-center whitespace-nowrap">{children}</span> */}
        </button>
      </div>
    </Wrapper>
  );
};
