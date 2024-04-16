import { GovernorABI } from "@/lib/abi/Governor";
import { TimelockControllerABI } from "@/lib/abi/TimelockController";
import { useContracts } from "@/lib/contracts/useContracts";
import { useMemo } from "react";
import { maxUint256 } from "viem";
import { useReadContracts } from "wagmi";

function convertCeloBlocksToSeconds(
  numBlocks: string | bigint | number,
): number {
  // Based on the 120960 blocks per week calculation used in governance contracts
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
  rawParam: any,
  formatter: (value: string | number | bigint) => string,
) {
  if (rawParam.result !== undefined) {
    return formatter(rawParam.result);
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
    allowFailure: false,
  });

  const { votingPeriod, proposalThreshold, quorumNeeded, timeLockDuration } =
    useMemo(() => {
      if (result.data) {
        const [
          votingPeriod,
          proposalThreshold,
          quorumNeeded,
          timeLockDuration,
        ] = result.data;
        return {
          votingPeriod,
          proposalThreshold,
          quorumNeeded,
          timeLockDuration,
        };
      } else {
        return {
          votingPeriod: 0,
          proposalThreshold: 0,
          quorumNeeded: maxUint256,
          timeLockDuration: 0,
        };
      }
    }, [result.data]);

  const votingPeriodFormatted = useMemo(
    () =>
      formatParam(votingPeriod, (value) => {
        const votingPeriodInSeconds = convertCeloBlocksToSeconds(value);
        return `${convertSecondsToDays(votingPeriodInSeconds)} days`;
      }),
    [votingPeriod],
  );

  const timeLockFormatted = useMemo(
    () =>
      formatParam(timeLockDuration, (value) => {
        return `${convertSecondsToDays(value)} days`;
      }),
    [timeLockDuration],
  );

  return {
    votingPeriod,
    timeLockDuration,
    proposalThreshold,
    quorumNeeded,
    votingPeriodFormatted,
    timeLockFormatted,
  };
};

export default useGovernanceDetails;
