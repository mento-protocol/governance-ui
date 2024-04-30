import useTokens from "@/lib/contracts/useTokens";
import React, { ElementRef, RefObject } from "react";
import { formatUnits } from "viem";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";
import ValueLoaderSkeleton from "../value-loader-skeleton/value-loader-skeleton.component";

type CurrencyInputProps = React.InputHTMLAttributes<HTMLInputElement> &
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
      error: { true: "border-error" },
    },
    defaultVariants: {
      fullWidth: false,
      disabled: false,
      error: false,
    },
  },
);

export const CurrencyInput = ({
  label,
  className,
  errorMessage,
  addon,
  fullWidth,
  disabled,
  onMax,
  onChange,
  id,
  inputRef,
  ...props
}: CurrencyInputProps & {
  inputRef?: RefObject<ElementRef<"input">>;
  onMax?: () => void;
  onChange: (val: string) => void;
}) => {
  const _onChange: React.InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    e,
  ) => {
    const nextUserInput = e.target.value;
    if (typeof nextUserInput === "undefined") {
      return;
    }
    const val = nextUserInput.replace(/,/g, ".");
    if (/^[0-9]*\.?[0-9]*$/.test(val)) {
      if (onChange) onChange(val);
    }
  };
  const hasError = !!errorMessage;
  return (
    <div className="flex flex-col">
      <div
        className={cn(
          variants({ error: hasError, fullWidth, disabled, className }),
        )}
      >
        {!!label && <label htmlFor={id}>{label}</label>}
        <input
          {...props}
          ref={inputRef}
          id={id}
          className="text-[22px] focus:outline-none disabled:bg-white"
          placeholder="0.0"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          autoComplete="off"
          disabled={disabled}
          onChange={_onChange}
        />
        <UseMaxBalanceButton onMax={onMax} />
      </div>
      <span className="min-h-[24px] text-error">
        <>{!!errorMessage && errorMessage}</>
      </span>
    </div>
  );
};

const UseMaxBalanceButton = ({ onMax }: { onMax?: () => void }) => {
  const { mentoBalance, isBalanceLoading } = useTokens();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onMax?.();
      }}
      className="w-full opacity-50"
    >
      <div className="flex justify-between gap-1">
        <div>Max available</div>
        <div className="flex gap-1">
          <span>
            {isBalanceLoading ? (
              <ValueLoaderSkeleton className="text-[14px]">
                {"0000000"}
              </ValueLoaderSkeleton>
            ) : (
              <>
                {`${Number(formatUnits(mentoBalance.value, mentoBalance.decimals)).toFixed(3)}`}
              </>
            )}
          </span>
          {` ${mentoBalance.symbol}`}
        </div>
      </div>
    </button>
  );
};

export default CurrencyInput;
