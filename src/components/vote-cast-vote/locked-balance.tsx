import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import { numberSuffixFormat } from "@/lib/helpers/numbers.service";

const LockedBalance = () => {
  const { veMentoBalance } = useTokens();
  return (
    <div className="flex flex-col gap-x2 items-center font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] animate-[pulse] leading-[2rem]">{`${numberSuffixFormat(Number(formatUnits(veMentoBalance.value, veMentoBalance.decimal)), 2)} veMENTO`}</div>
    </div>
  );
};

export default LockedBalance;
