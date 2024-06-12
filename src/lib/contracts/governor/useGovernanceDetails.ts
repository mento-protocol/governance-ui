import { GovernorABI } from "@/lib/abi/Governor";
import { TimelockControllerABI } from "@/lib/abi/TimelockController";
import { useContracts } from "@/lib/contracts/useContracts";
import { ensureChainId } from "@/lib/helpers/ensureChainId";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { useMemo } from "react";

import { useAccount, useReadContracts } from "wagmi";

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

function convertSecondsToMinutes(
  durationInSeconds: string | bigint | number,
): number {
  const minutes = Number(durationInSeconds) / 60;
  return Math.floor(minutes);
}

function formatParam(
  result: any,
  formatter: (value: string | number | bigint) => string,
) {
  return formatter(result);
}

const useGovernanceDetails = () => {
  const ensuredChainId = useEnsureChainId();
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
        chainId: ensuredChainId,
      },
      {
        ...governorContact,
        functionName: "proposalThreshold",
        chainId: ensuredChainId,
      },
      {
        ...governorContact,
        functionName: "quorumVotes",
        chainId: ensuredChainId,
      },
      {
        ...timeLockContract,
        functionName: "getMinDelay",
        chainId: ensuredChainId,
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
          votingPeriod: null,
          proposalThreshold: null,
          quorumNeeded: null,
          timeLockDuration: null,
        };
      }
    }, [result.data]);

  const votingPeriodFormatted = useMemo(() => {
    if (!votingPeriod) return "-";

    return formatParam(votingPeriod, (value) => {
      const votingPeriodInSeconds = convertCeloBlocksToSeconds(value);
      const votingPeriodInDays = convertSecondsToDays(votingPeriodInSeconds);
      if (votingPeriodInDays < 1) {
        return `${convertSecondsToMinutes(votingPeriodInSeconds)} minutes`;
      }
      return `${votingPeriodInDays} days`;
    });
  }, [votingPeriod]);

  const timeLockFormatted = useMemo(() => {
    if (!timeLockDuration) return "-";

    return formatParam(timeLockDuration, (value) => {
      const timeLockDurationInDays = convertSecondsToDays(value);
      if (timeLockDurationInDays < 1) {
        return `${convertSecondsToMinutes(value)} minutes`;
      }
      return `${timeLockDurationInDays} days`;
    });
  }, [timeLockDuration]);

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
