import { useReadContract } from "wagmi";
import { useAccount } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import type { Proposal } from "@/lib/graphql/subgraph/generated/subgraph";
import { useContracts } from "@/lib/contracts/useContracts";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { useMemo } from "react";
import * as Sentry from "@sentry/nextjs";

export function useVotingPowerForProposal(proposal: Proposal) {
  const { address } = useAccount();
  const ensuredChainId = useEnsureChainId();
  const { Locking } = useContracts();

  const getPastVotesArgs = useMemo(() => {
    try {
      const blockNumber =
        proposal?.proposalCreated?.[0]?.transaction?.blockNumber;
      if (!address || !blockNumber) {
        return undefined;
      }
      return [address, BigInt(blockNumber)] as const;
    } catch (error) {
      Sentry.captureException(error);
      return undefined;
    }
  }, [address, proposal?.proposalCreated]);

  return useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getPastVotes",
    args: getPastVotesArgs,
    chainId: ensuredChainId,
  });
}
