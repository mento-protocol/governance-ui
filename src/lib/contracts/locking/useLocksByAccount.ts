import { getSubgraphApiName } from "@/config/config.constants";
import { useGetLocksQuery } from "@/lib/graphql/subgraph/generated/subgraph";
import LockingHelper from "@/lib/helpers/locking";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import useLockingWeek from "./useLockingWeek";
import { useMemo } from "react";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";
interface UseLocksProps {
  account: string;
}

const useLocksByAccount = ({ account }: UseLocksProps) => {
  const { currentWeek: currentLockingWeek } = useLockingWeek();
  const ensuredChainId = useEnsureChainId();
  const { data, ...rest } = useGetLocksQuery({
    refetchWritePolicy: "overwrite",
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
    variables: {
      address: account,
    },
    context: {
      apiName: getSubgraphApiName(ensuredChainId),
    },
    ssr: false,
  });

  const locks = useMemo(() => {
    if (!data) {
      return [];
    }
    return data?.locks.map((lock) => ({
      ...lock,
      expiration: LockingHelper.calculateExpirationDate(
        Number(currentLockingWeek),
        lock.time,
        lock.slope,
        lock.cliff,
      ),
    }));
  }, [data, currentLockingWeek]) as LockWithExpiration[];

  return {
    locks,
    ...rest,
  };
};

export default useLocksByAccount;
