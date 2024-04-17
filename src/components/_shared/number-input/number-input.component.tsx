import useTokens from "@/lib/contracts/useTokens";
import React from "react";
import { formatUnits } from "viem";
import { Input, InputProps } from "../input/input.component";

const CurrencyInput = ({
  onMax,
  ...props
}: InputProps & { onMax?: () => void }) => {
  return <Input {...props} addon={<UseMaxBalanceButton onMax={onMax} />} />;
};

const UseMaxBalanceButton = ({ onMax }: { onMax?: () => void }) => {
  const { mentoBalance } = useTokens();

  return (
    <button onClick={onMax} className="w-full opacity-50">
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
