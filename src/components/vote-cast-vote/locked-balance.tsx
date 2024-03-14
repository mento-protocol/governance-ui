import NumbersService from "@lib/helpers/numbers.service";
import { useChainState } from "@lib/providers/chainState.provider";
import { formatUnits } from "viem";

const LockedBalance = () => {
  const tokens = useChainState((s) => s.tokens);
  return (
    <div className="flex flex-col gap-x2 items-center font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      <div className="text-[2rem] animate-[pulse] leading-[2rem]">{`${NumbersService.parseNumericValue(formatUnits(tokens.veMento.balance, tokens.veMento.decimals))} veMENTO`}</div>
    </div>
  );
};

export default LockedBalance;
