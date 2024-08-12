import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import {
  addDays,
  addWeeks,
  isWednesday,
  nextWednesday,
  startOfWeek,
  subWeeks,
} from "date-fns";

const useLockExpirationDate = (slope = 0, cliff = 0, weekLocked = 0) => {
  const { Locking } = useContracts();
  const ensuredChainId = useEnsureChainId();

  return useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
    args: [],
    chainId: ensuredChainId,
    query: {
      refetchOnReconnect: true,
      initialData: 0n,
      enabled: weekLocked > 0,
      select: (currentWeek) => {
        return calculateExpirationDate(
          Number(currentWeek),
          weekLocked,
          cliff,
          slope,
        );
      },
    },
  });
};

function calculateExpirationDate(
  currentWeek: number,
  weekLocked: number,
  cliff: number,
  slope: number,
): Date {
  // Calculate weeks passed since lock
  const weeksPassed = currentWeek - weekLocked;

  // Calculate remaining weeks in the vesting schedule
  const remainingWeeks = cliff + slope - weeksPassed;

  // Calculate the initial lock date by subtracting weeks passed from the start of the current week
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 3 });
  const initialLockDate = nextWednesday(
    subWeeks(startOfCurrentWeek, weeksPassed),
  );

  // Add the remaining weeks to the initial lock date
  let expirationDate = addWeeks(initialLockDate, remainingWeeks);

  // Ensure the expiration date is the next Wednesday if it's already a Wednesday,
  // otherwise move to the Wednesday after
  expirationDate = isWednesday(expirationDate)
    ? nextWednesday(addDays(expirationDate, 1))
    : nextWednesday(expirationDate);

  return expirationDate;
}

export default useLockExpirationDate;
