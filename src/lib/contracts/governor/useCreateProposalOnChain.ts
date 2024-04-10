import { GovernorABI } from "@/lib/abi/Governor";
import { useContracts } from "@/lib/contracts/useContracts";
import { useCallback } from "react";
import { Address, Hex, isAddress, isHex, toHex } from "viem";
import { useWriteContract } from "wagmi";
import { WriteContractErrorType } from "wagmi/actions";

export type TransactionItem = {
  address: Address;
  value: string | number | bigint;
  data: string | Hex;
};

export const isTransactionItem = (
  toBeDetermined: any,
): toBeDetermined is TransactionItem => {
  return (
    typeof toBeDetermined === "object" &&
    toBeDetermined !== null &&
    "address" in toBeDetermined &&
    isAddress(toBeDetermined["address"]) &&
    "value" in toBeDetermined &&
    (isHex(toBeDetermined["value"]) ||
      typeof toBeDetermined["value"] === "bigint" ||
      typeof toBeDetermined["value"] === "number") &&
    "data" in toBeDetermined &&
    isHex(toBeDetermined["data"])
  );
};

export type ProposalCreateParams = {
  metadata: { title: string; description: string };
  transactions: TransactionItem[];
};

const useCreateProposalOnChain = () => {
  const { data, error, writeContract, isSuccess } = useWriteContract();
  const { MentoGovernor } = useContracts();

  const createProposal = useCallback(
    (
      proposal: ProposalCreateParams,
      onSuccess?: () => void,
      onError?: (error?: WriteContractErrorType) => void,
    ) => {
      writeContract(
        {
          address: MentoGovernor.address as Address,
          abi: GovernorABI,
          functionName: "propose",
          args: [
            proposal.transactions.map(
              (transaction) => transaction.address as Address,
            ),
            proposal.transactions.map((transaction) =>
              BigInt(transaction.value),
            ),
            proposal.transactions.map((transaction) => toHex(transaction.data)), // TODO: Confirm this doesn't need toBytes first
            JSON.stringify(proposal.metadata),
          ],
        },
        {
          onSuccess,
          onError,
        },
      );
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
