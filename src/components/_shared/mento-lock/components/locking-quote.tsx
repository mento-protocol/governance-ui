import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import { useDebounce } from "@/lib/hooks/useDebounce";

export const LockingQuote = ({
  amount,
  slope,
  cliff,
}: {
  amount: string;
  slope: number;
  cliff: number;
}) => {
  const debouncedAmount = useDebounce(amount, 500);
  const debouncedSlope = useDebounce(slope, 500);
  const debouncedCliff = useDebounce(cliff, 500);

  const { data: { veMentoReceived } = { veMentoReceived: 0 }, isLoading } =
    useLockCalculation({
      lock: {
        amount: debouncedAmount,
        slope: debouncedSlope,
        cliff: debouncedCliff,
      },
    });

  return (
    <span className="text-[22px]">
      {isLoading ? (
        <div className="animate-pulse rounded-[4px] bg-gray-300">
          <span className="opacity-0">{amount}</span>
        </div>
      ) : (
        <div className="font-medium">{veMentoReceived}</div>
      )}
    </span>
  );
};
