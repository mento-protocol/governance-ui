import NumbersService from "@/lib/helpers/numbers.service";
import { useLockingQuote } from "../hooks/useDebounceLockingQuote";

export const LockingQuote = ({
  amount,
  slope,
  cliff,
}: {
  amount: number;
  slope: number;
  cliff: number;
}) => {
  const quote = useLockingQuote({
    amount,
    slope,
    cliff,
  });

  return (
    <span className="text-[22px]">
      {quote.isLoading ? (
        <div className="animate-pulse rounded-[4px] bg-gray-300">
          <span className="opacity-0">{amount}</span>
        </div>
      ) : (
        <div className="font-medium">
          {NumbersService.parseNumericValue(quote?.data)}
        </div>
      )}
    </span>
  );
};
