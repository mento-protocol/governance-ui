import { GovernorABI } from "@lib/abi/Governor";
import { useContracts } from "@lib/contracts/useContracts";
import { useCallback } from "react";
import { Address } from "viem";
import { useWriteContract } from "wagmi";

export type ProposalCreateParams = {
  metadata: { title: string; description: string };
  transactions: Array<{
    address: string;
    value: string | number;
    data: string;
  }>;
};

const useCreateProposalOnChain = () => {
  const { data, error, writeContract, isSuccess } = useWriteContract();
  const { MentoGovernor } = useContracts();

  const createProposal = useCallback(
    (proposal: ProposalCreateParams) => {
      writeContract({
        address: MentoGovernor.address as Address,
        abi: GovernorABI,
        functionName: "propose",
        args: [
          proposal.transactions.map(
            (transaction) => transaction.address as Address,
          ),
          proposal.transactions.map((transaction) => BigInt(transaction.value)),
          proposal.transactions.map((transaction) => transaction.data),
          JSON.stringify(proposal.metadata),
        ] as any,
      });
    },
    [writeContract, MentoGovernor.address],
  );

  return {
    createProposal,
    createError: error,
    createTx: data,
    isSuccess,
  };
};

export default useCreateProposalOnChain;
