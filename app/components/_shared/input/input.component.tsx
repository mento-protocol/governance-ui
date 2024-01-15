import styles from "./input.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import BaseInputProps from "@interfaces/base-input-props.interface";

interface InputProps extends BaseComponentProps, BaseInputProps {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
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
  disabled,
  compact,
}: InputProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        compact && styles.compact,
        disabled && styles.disabled,
        className,
      )}
    >
      {!!label && <label htmlFor={id}>{label}</label>}
      <div className={classNames(styles.input, !!error && styles.error)}>
        <input
          id={id}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          {...form}
        />
        {addon}
      </div>
      {!!error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
