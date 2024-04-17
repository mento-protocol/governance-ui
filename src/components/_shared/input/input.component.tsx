import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof variants> & {
    label?: string;
    addon?: React.ReactNode;
    errorMessage?: string;
  };

const variants = cva(
  "flex flex-col gap-2 rounded-[4px] border border-gray-light p-2 text-sm disabled:bg-white dark:border-white",
  {
    variants: {
      fullWidth: { true: "w-full" },
      disabled: { true: "cursor-not-allowed opacity-50" },
      error: { true: "border-error-dark" },
    },
    defaultVariants: {
      fullWidth: false,
      disabled: false,
      error: false,
    },
  },
);

export const Input = ({
  label,
  className,
  errorMessage,
  addon,
  fullWidth,
  id,
  disabled,
  ...restProps
}: InputProps) => {
  const hasError = !!errorMessage;

  return (
    <>
      <div
        className={cn(
          variants({ error: hasError, fullWidth, disabled, className }),
        )}
      >
        {!!label && <label htmlFor={id}>{label}</label>}
        <input
          className="text-[22px] disabled:bg-white"
          id={id}
          {...restProps}
          disabled={disabled}
        />
        <span className="flex text-[14px]">{addon}</span>
      </div>
      {!!errorMessage && <div className={""}>{errorMessage}</div>}
    </>
  );
};
