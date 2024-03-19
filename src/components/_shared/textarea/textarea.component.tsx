import { ReactNode } from "react";
import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BaseInputProps from "@/interfaces/base-input-props.interface";
import styles from "./textarea.module.scss";

interface TextAreaProps extends BaseComponentProps, BaseInputProps {
  addon?: ReactNode;
  compact?: boolean;
}

export const Textarea = ({
  label,
  id,
  placeholder,
  className,
  form,
  addon,
  error,
  compact,
}: TextAreaProps) => {
  return (
    <div
      className={classNames(
        styles.wrapper,
        compact && styles.compact,
        className,
      )}
    >
      {!!label && <label htmlFor={id}>{label}</label>}
      <div className={classNames(styles.textarea, !!error && styles.error)}>
        <textarea id={id} placeholder={placeholder} {...form} />
        {addon}
      </div>
      {!!error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};
