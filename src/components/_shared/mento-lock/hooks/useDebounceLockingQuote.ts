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
  const { data, ...rest } = useLockCalculation({
    lock: {
      amount: debouncedAmount,
      slope: debouncedSlope,
      cliff: debouncedCliff,
    },
  });

  return {
    amount: !data?.length ? 0 : Number(data[0]),
    slope: !data?.length ? 0 : Number(data[1]),
    ...rest,
  };
};
