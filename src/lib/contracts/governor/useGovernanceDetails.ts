import { GovernorABI } from "@/lib/abi/Governor";
import { TimelockControllerABI } from "@/lib/abi/TimelockController";
import { useContracts } from "@/lib/contracts/useContracts";
import { formatUnits } from "viem";
import { useReadContracts } from "wagmi";

function convertCeloBlocksToSeconds(
  numBlocks: string | bigint | number,
): number {
  // Based on the 120960 blocks per week calulation used in governance contracts
  const CELO_SECONDS_PER_BLOCK = 5;
  return Number(numBlocks) * CELO_SECONDS_PER_BLOCK;
}

function convertSecondsToDays(
  durationInSeconds: string | bigint | number,
): number {
  const secondsPerDay = 24 * 60 * 60;
  const days = Number(durationInSeconds) / secondsPerDay;
  return Math.floor(days);
}

function formatParam(
  data: any,
  formatter: (value: string | number | bigint) => string,
) {
  if (data.result !== undefined) {
    return formatter(data.result);
  }

  return null;
}
const useGovernanceDetails = () => {
  const { MentoGovernor, TimelockController } = useContracts();

  const governorContact = {
    address: MentoGovernor.address,
    abi: GovernorABI,
  } as const;

  const timeLockContract = {
    address: TimelockController.address,
    abi: TimelockControllerABI,
  } as const;

  const result = useReadContracts({
    contracts: [
      {
        ...governorContact,
        functionName: "votingPeriod",
      },
      {
        ...governorContact,
        functionName: "proposalThreshold",
      },
      {
        ...governorContact,
        functionName: "quorumVotes",
      },
      {
        ...timeLockContract,
        functionName: "getMinDelay",
      },
    ],
  });

  if (!result.data) {
    return null;
  }

  const [
    votingPeriodData,
    proposalThresholdData,
    quorumNeededData,
    timeLockDurationData,
  ] = result.data;

  const votingPeriod = formatParam(votingPeriodData, (value) => {
    const votingPeriodInSeconds = convertCeloBlocksToSeconds(value);
    return `${convertSecondsToDays(votingPeriodInSeconds)} days`;
  });

  const timelock = formatParam(timeLockDurationData, (value) => {
    return `${convertSecondsToDays(value)} days`;
  });

  const proposalThreshold = formatParam(proposalThresholdData, (value) => {
    return formatUnits(BigInt(value), 18);
  });

  const quorumNeeded = formatParam(quorumNeededData, (value) => {
    return Math.round(Number(formatUnits(BigInt(value), 18))).toString();
  });

  return {
    votingPeriod,
    timelock,
    proposalThreshold,
    quorumNeeded,
  };
};

export default useGovernanceDetails;
