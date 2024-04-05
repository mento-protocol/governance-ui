import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";

export const LockedBalance = () => {
  const { veMentoBalance } = useTokens();
  return (
    <div className="flex flex-col items-center gap-x2 font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="animate-[pulse] text-[2rem] leading-[2rem]">{`${NumbersService.parseNumericValue(formatUnits(veMentoBalance.value, veMentoBalance.decimals))} veMENTO`}</div>
    </div>
  );
};
