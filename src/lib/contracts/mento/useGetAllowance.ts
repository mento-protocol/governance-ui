import { useReadContract } from "wagmi";
import { Address, erc20Abi } from "viem";
import { useContracts } from "@/lib/contracts/useContracts";

const useGetAllowance = ({
  owner,
  spender,
}: {
  owner?: Address;
  spender: Address;
}) => {
  const contracts = useContracts();

  return useReadContract({
    abi: erc20Abi,
    address: contracts.MentoToken.address,
    functionName: "allowance",
    args: [owner!, spender],
    query: { enabled: !!owner },
  });
};

export default useGetAllowance;
