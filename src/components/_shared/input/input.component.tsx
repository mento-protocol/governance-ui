import { ReactNode } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BaseInputProps from "@/interfaces/base-input-props.interface";
import { cn } from "@/styles/helpers";
import { cva } from "class-variance-authority";

interface InputProps extends BaseComponentProps, BaseInputProps {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  addon?: ReactNode;
  compact?: boolean;
}

const inputWrapperVariant = cva(
  cn(
    "mt-x1 w-full gap-2 rounded-lg border border-solid border-gray-light transition-all duration-200 ease-out-circ",
    "focus-within:border focus-within:border-solid focus-within:border-primary focus-within:shadow-[0_0_0_2px] focus-within:shadow-primary",
    "focus:border focus:border-solid focus:border-primary focus:shadow-[0_0_0_2px] focus:shadow-primary",
  ),
  {
    variants: {
      compact: {
        true: "px-4 py-3",
        false: "px-[32px] py-[18px]",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
      error: {
        true: "border border-solid border-error focus:shadow-[0_0_0_2px] focus:shadow-error",
      },
    },
    defaultVariants: {
      compact: false,
      disabled: false,
      error: false,
    },
  },
);

const inputVariant = cva(
  cn(
    "w-full border-none bg-transparent text-lg font-normal text-black caret-primary outline-none dark:text-white",
    "placeholder:text-gray-light",
  ),
  {
    variants: {
      compact: {
        true: "text-sm",
      },
      disabled: {
        true: "cursor-not-allowed",
      },
      error: {
        true: "border border-solid border-error focus:shadow-[0_0_0_2px] focus:shadow-error",
      },
    },
    defaultVariants: {
      compact: false,
      disabled: false,
      error: false,
    },
  },
);

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
  value,
}: InputProps) => {
  return (
    <div className={cn("mt-x1", disabled && "cursor-not-allowed", className)}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <div
        className={inputWrapperVariant({
          compact,
          disabled,
          error: !!error,
        })}
      >
        <input
          id={id}
          className={inputVariant({
            compact,
            disabled,
            error: !!error,
          })}
          placeholder={placeholder}
          disabled={disabled}
          type={type}
          value={value}
          {...form}
        />
        {addon}
      </div>
      {!!error && (
        <div className="p2-1 text-sm font-semibold text-error-dark">
          {error}
        </div>
      )}
    </div>
  );
};
