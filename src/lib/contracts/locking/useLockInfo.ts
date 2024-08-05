import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import { formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";
import useTokens from "../useTokens";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

interface ILockHook {
  lock: Pick<Lock, "slope" | "cliff"> & { amount: string };
}

const useLockCalculation = ({ lock }: ILockHook) => {
  const { Locking } = useContracts();
  const {
    mentoContractData: { decimals: mentoDecimals },
    veMentoContractData: { decimals: veMentoDecimals },
  } = useTokens();
  const ensuredChainId = useEnsureChainId();

  return useReadContract({
    address: Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [parseUnits(lock.amount, mentoDecimals), lock.slope, lock.cliff],
    chainId: ensuredChainId,
    query: {
      enabled: Number(lock.amount) > 0 && lock.slope > 0,
      select: ([quote, slope]) => {
        return {
          veMentoReceived: Number(formatUnits(quote, veMentoDecimals)).toFixed(
            3,
          ),
          slope: formatUnits(slope, 1),
        };
      },
    },
  });
};

export default useLockCalculation;
