import { Proposal } from "@/lib/graphql";
import { useMemo } from "react";

export function useIsTimeLocked(proposal: Proposal | undefined): boolean {
  const isTimeLocked = useMemo(() => {
    if (proposal && proposal.state === "Queued" && proposal.proposalQueued[0]) {
      const timeLockDeadline = new Date(
        Number(proposal.proposalQueued[0].eta) * 1000,
      );
      return timeLockDeadline.getTime() >= Date.now();
    }
    return false;
  }, [proposal]);

  return isTimeLocked;
}
