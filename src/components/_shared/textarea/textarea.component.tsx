import { ReactNode } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BaseInputProps from "@/interfaces/base-input-props.interface";
import { cn } from "@/styles/helpers";
import { cva } from "class-variance-authority";

interface TextAreaProps extends BaseComponentProps, BaseInputProps {
  addon?: ReactNode;
  compact?: boolean;
}

const textAreaWrapperVariant = cva(
  cn(
    "mt-x1 min-h-[inherit] w-full gap-2 rounded-lg border border-solid border-gray-light transition-all duration-200 ease-out-circ",
    "focus-within:border focus-within:border-solid focus-within:border-primary focus-within:shadow-[0_0_0_2px] focus-within:shadow-primary",
    "focus:border focus:border-solid focus:border-primary focus:shadow-[0_0_0_2px] focus:shadow-primary",
  ),
  {
    variants: {
      compact: {
        true: "px-4 py-3",
        false: "px-[32px] py-[18px]",
      },
      error: {
        true: "border border-solid border-error focus:shadow-[0_0_0_2px] focus:shadow-error",
      },
    },
    defaultVariants: {
      compact: false,
      error: false,
    },
  },
);

const textAreaVariant = cva(
  cn(
    "min-h-[inherit] w-full border-none bg-transparent text-lg font-normal text-black caret-primary outline-none dark:text-white",
    "placeholder:text-gray-light",
  ),
  {
    variants: {
      compact: {
        true: "text-sm",
      },
      error: {
        true: "border border-solid border-error focus:shadow-[0_0_0_2px] focus:shadow-error",
      },
    },
    defaultVariants: {
      compact: false,
      error: false,
    },
  },
);

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
    <div className={cn("w-full", className)}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <div
        className={textAreaWrapperVariant({
          compact,
          error: !!error,
        })}
      >
        <textarea
          className={textAreaVariant({
            compact,
            error: !!error,
          })}
          id={id}
          placeholder={placeholder}
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
