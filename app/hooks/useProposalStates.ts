/**
 * Proposal States are a bit tricky to com epute from the data we get from the graph.
 * This is because the state dependes both on the Proposal and the TimelockOperation.
 * These are as follows:
 * Pending: Proposal is created but startBlock > block.now
 * Active: startBlock <= block.now
 * Succeeded: startBlock <= block.now and endBlock > block.now and it passed quorum
 * Defeated: endBlock < block.now and it did not pass quorum
 * Queued: SUCCEEDED and timelockOperation is created (queued)
 * Expired: Was not executed in time
 * Executed: associated timelockOperation is executed
 * Cancelled: associated timelockOperation is cancelled
 *
 * Because if this, it's easier to rely on the on-chain implementation of the state
 * instead of recomputing it from event data. In order to do this we will create a reactive
 * variable that will keep a mapping of proposalId -> state.
 * This reactive variable will then feed into the graphql cache.
 * See https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-reactive-variables
 */

import { makeVar } from "@apollo/client/cache";
import { Proposal, ProposalState, Scalars } from "@/app/graphql";
import { useEffect } from "react";
import { useContractReads } from "wagmi";
import { GovernorABI } from "@/app/abis/Governor";

type ProposalID = Scalars["ID"]["output"];
type ProposalToState = Record<ProposalID, ProposalState>;
export const proposalToStateVar = makeVar<ProposalToState>({});

/// ENUMS in solidity are just numbers, so we need to map them to the ProposalState enum
type StateNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
const STATE_FROM_NUMBER: Record<StateNumbers, ProposalState> = {
  0: ProposalState.Pending,
  1: ProposalState.Active,
  2: ProposalState.Canceled,
  3: ProposalState.Defeated,
  4: ProposalState.Succeeded,
  5: ProposalState.Queued,
  6: ProposalState.Expired,
  7: ProposalState.Executed,
};

export const useProposalStates = (
  proposals: Pick<Proposal, "proposalId">[],
) => {
  const { data, isError, isLoading } = useContractReads({
    contracts: proposals.map((proposal) => ({
      // TODO: Add propper address
      address: "0xc1d32e3bac67b28d31d7828c8ff160e44c37be1c",
      abi: GovernorABI,
      functionName: "state",
      args: [proposal.proposalId],
    })),
  });

  useEffect(() => {
    if (isLoading || isError) return;
    if (data === undefined) return;
    proposalToStateVar(
      data.reduce<ProposalToState>((acc, { result }, index) => {
        if (
          result &&
          typeof result === "number" &&
          result >= 0 &&
          result <= 7
        ) {
          const proposalId = proposals[index].proposalId;
          acc[proposalId] = STATE_FROM_NUMBER[result];
        }
        return acc;
      }, {}),
    );
  }, [data, isLoading, isError, proposals]);
};
