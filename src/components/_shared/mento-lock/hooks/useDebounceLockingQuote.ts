import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import { useDebounce } from "@/lib/hooks/useDebounce";

export const useLockingQuote = ({
  amount,
  slope,
  cliff,
}: {
  amount: number;
  slope: number;
  cliff: number;
}) => {
  const debouncedAmount = useDebounce(amount, 500);
  const debouncedSlope = useDebounce(slope, 500);
  const debouncedCliff = useDebounce(cliff, 500);

  const parsedDebouncedAmount = Number(debouncedAmount).toFixed();

  const { data, ...rest } = useLockCalculation({
    lock: {
      amount: parsedDebouncedAmount,
      slope: debouncedSlope,
      cliff: debouncedCliff,
    },
  });

  return { data: !data?.length ? 0 : Number(data[0]), ...rest };
};
