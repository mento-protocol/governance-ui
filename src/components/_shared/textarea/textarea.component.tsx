import { ReactNode } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BaseInputProps from "@/interfaces/base-input-props.interface";
import { cn } from "@/styles/helpers";
import { cva } from "class-variance-authority";

interface TextAreaProps
  extends BaseComponentProps,
    Omit<BaseInputProps, "error"> {
  error?: string | ReactNode;
  addon?: ReactNode;
  compact?: boolean;
}

const textAreaWrapperVariant = cva(
  cn(
    "mt-x1 min-h-[inherit] w-full gap-2 rounded-lg border border-solid transition-all duration-200 ease-out-circ",
    "focus-within:border focus-within:border-solid focus:shadow-[0_0_0_2px] ",
    "focus-within:shadow-[0_0_0_2px] focus:border focus:border-solid",
  ),
  {
    variants: {
      compact: {
        true: "px-4 py-3",
        false: "px-[32px] py-[18px]",
      },
      error: {
        true: cn(
          "border-error",
          "focus:border-error focus:shadow-error",
          "focus-within:border-error focus-within:shadow-error",
        ),
        false: cn(
          "border-gray-light",
          "focus:border-primary focus:shadow-primary",
          "focus-within:border-primary focus-within:shadow-primary",
        ),
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
    },
    defaultVariants: {
      compact: false,
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
