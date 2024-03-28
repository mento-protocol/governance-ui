import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";

const LockedBalance = () => {
  const { veMentoBalance } = useTokens();
  return (
    <div className="flex flex-col gap-x2 items-center font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] animate-[pulse] leading-[2rem]">{`${NumbersService.parseNumericValue(formatUnits(veMentoBalance.value, veMentoBalance.decimals))} veMENTO`}</div>
    </div>
  );
};

export default LockedBalance;