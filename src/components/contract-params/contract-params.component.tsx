"use client";
import React from "react";
import classNames from "classnames";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

import { Card } from "@components/_shared";
import WalletHelper from "@lib/helpers/wallet.helper";
import { CopyIcon } from "@components/_icons/copy.icon";
import { TimelockControllerABI } from "@lib/abi/TimelockController";
import { GovernorABI } from "@lib/abi/Governor";
import { Celo } from "@config/chains";
import { useContracts } from "@lib/contracts/useContracts";

export const ContractParams = () => {
  const governanceDetails = useGovernanceDetails();
  const governorContractAddresses = useGovernanceContractAddresses();

  return (
    <div className="grid grid-cols-1 gap-x1 md:grid-cols-7 px-x4 pt-x4">
      <Card className="md:col-span-3 flex flex-col">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Parameters
          </div>
        </Card.Header>
        <div className="flex flex-col flex-grow justify-between gap-[15px]">
          <ParamDisplay
            label="Proposal threshold"
            value={governanceDetails?.proposalThreshold}
          />
          <ParamDisplay
            label="Quorum needed"
            value={governanceDetails?.quorumNeeded}
          />

          <ParamDisplay
            label="Voting period"
            value={governanceDetails?.votingPeriod}
          />
          <ParamDisplay label="Timelock" value={governanceDetails?.timelock} />
        </div>
      </Card>
      <Card className="md:col-span-4 flex flex-col">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Contract addresses
          </div>
        </Card.Header>
        <div className="flex flex-col flex-grow justify-between gap-[15px]">
          <ParamDisplay
            label="Governor"
            value={
              governorContractAddresses.governor ? (
                <ContractAddressLinkWithCopy
                  address={governorContractAddresses.governor}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Token"
            value={
              governorContractAddresses.mento ? (
                <ContractAddressLinkWithCopy
                  address={governorContractAddresses.mento}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Timelock"
            value={
              governorContractAddresses.timelock ? (
                <ContractAddressLinkWithCopy
                  address={governorContractAddresses.timelock}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Locker"
            value={
              governorContractAddresses.locking ? (
                <ContractAddressLinkWithCopy
                  address={governorContractAddresses.locking}
                />
              ) : null
            }
          />
        </div>
      </Card>
    </div>
  );
};

const ParamDisplay = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode | undefined;
}) => {
  return (
    <div className="flex gap-8 justify-between items-center">
      <div className="font-semibold">{label}</div>
      <div className="text-right col-span-2 break-all">{value ?? "-"}</div>
    </div>
  );
};

const ContractAddressLinkWithCopy = ({
  address,
  className,
  ...restProps
}: {
  address: string | undefined;
  className?: string;
}) => {
  const { chain } = useAccount();
  const connectedChainOrMainnet = chain ?? Celo;
  const blockExplorerUrl = connectedChainOrMainnet.blockExplorers?.default.url;
  const blockExplorerContractUrl = `${blockExplorerUrl}/address/${address}`;
  const windowWidth = useWindowWidth();
  let addressLength = 30;

  if (!address) {
    return;
  }

  if (windowWidth <= 600) {
    addressLength = 15;
  } else if (windowWidth <= 1200) {
    addressLength = 20;
  }

  return (
    <div
      {...restProps}
      className={classNames(className, "flex items-center gap-8")}
    >
      <Link
        target="_blank"
        rel="nooppener noreferrer"
        href={blockExplorerContractUrl}
      >
        {WalletHelper.getShortAddress(address, addressLength)}
      </Link>
      <CopyToClipboard text={address}>
        <div className="cursor-pointer">
          <CopyIcon />
        </div>
      </CopyToClipboard>
    </div>
  );
};

function useGovernanceDetails() {
  const governanceContractAddresses = useGovernanceContractAddresses();

  const govenorContact = {
    address: governanceContractAddresses.governor,
    abi: GovernorABI,
  } as const;
  const timeLockContract = {
    address: governanceContractAddresses.timelock,
    abi: TimelockControllerABI,
  } as const;

  const result = useReadContracts({
    contracts: [
      {
        ...govenorContact,
        functionName: "votingPeriod",
      },
      {
        ...govenorContact,
        functionName: "proposalThreshold",
      },
      {
        ...govenorContact,
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
}

function useGovernanceContractAddresses() {
  const contracts = useContracts();

  const governor = contracts.MentoGovernor.address;
  const timelock = contracts.TimelockController.address;
  const locking = contracts.Locking.address;
  const mento = contracts.MentoToken.address;

  return {
    governor,
    timelock,
    locking,
    mento,
  };
}

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

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth,
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
