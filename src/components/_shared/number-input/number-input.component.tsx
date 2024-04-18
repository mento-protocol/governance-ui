import useTokens from "@/lib/contracts/useTokens";
import React from "react";
import { formatUnits } from "viem";
import { Input, InputProps } from "../input/input.component";

const CurrencyInput = ({
  onMax,
  onChange,
  ...props
}: InputProps & { onMax?: () => void; onChange: (val: string) => void }) => {
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

  return (
    <Input
      {...props}
      placeholder="0.0"
      autoCorrect="off"
      autoCapitalize="none"
      spellCheck="false"
      autoComplete="off"
      onChange={_onChange}
      addon={<UseMaxBalanceButton onMax={onMax} />}
    />
  );
};

const UseMaxBalanceButton = ({ onMax }: { onMax?: () => void }) => {
  const { mentoBalance } = useTokens();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onMax?.();
      }}
      className="w-full opacity-50"
    >
      <div className="flex justify-between gap-2">
        <div>Max available</div>
        <div className="mr-3">
          {`${formatUnits(mentoBalance.value, mentoBalance.decimals)} ${mentoBalance.symbol}`}
        </div>
      </div>
    </button>
  );
};

export default CurrencyInput;
