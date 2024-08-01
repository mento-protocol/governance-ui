import { LockingABI } from "@/lib/abi/Locking";
import { useAccount, useReadContract } from "wagmi";
import { useContracts } from "../useContracts";

export const useUnlockedMento = () => {
  const contracts = useContracts();
  const { address } = useAccount();

  return useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getAvailableForWithdraw",
    args: address && [address],
    query: {
      enabled: Boolean(address),
    },
  });
};
