"use client";
import React, { Suspense } from "react";
import classNames from "classnames";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { formatUnits } from "viem";
import { useAccount, useReadContracts } from "wagmi";

import { Card, Expandable, Loader } from "@components/_shared";
import WalletHelper from "@/app/helpers/wallet.helper";
import { CopyIcon } from "../_icons/copy.icon";
import { TimelockControllerABI } from "@/app/abis/TimelockController";
import { GovernorABI } from "@/app/abis/Governor";
import { Celo } from "@/app/helpers/chains";
import { useContracts } from "@/app/hooks/useContracts";

export const ContractParams = () => {
  const governanceDetails = useGovernanceDetails();
  const governorContractAddresses = useGovernanceContractAddresses();

  return (
    <Expandable
      header={"Governance Parameters"}
      className="font-medium font-size-x4"
    >
      <Suspense fallback={<Loader isCenter />}>
        <div className="grid grid-cols-1 gap-x2 md:grid-cols-7 md:pt-x4">
          <Card noBorderMobile className="md:col-span-3 flex flex-col">
            <Card.Header>
              <div className="text-primary text-center md:text-left font-light mb-x6">
                Parameters
              </div>
            </Card.Header>
            <div className="flex flex-col flex-grow justify-between gap-x3">
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
              <ParamDisplay
                label="Timelock"
                value={governanceDetails?.timelock}
              />
            </div>
          </Card>
          <Card noBorderMobile className="md:col-span-4 flex flex-col">
            <Card.Header>
              <div className="text-primary text-center md:text-left font-light mb-[20px] md:mb-[30px]">
                Contract addresses
              </div>
            </Card.Header>
            <div className="flex flex-col flex-grow justify-between gap-[15px]">
              <ParamDisplay
                label="Governor"
                vertical
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
                vertical
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
                vertical
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
                vertical
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
      </Suspense>
    </Expandable>
  );
};

const ParamDisplay = ({
  label,
  value,
  vertical,
}: {
  label: string;
  value: React.ReactNode | undefined;
  vertical?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "flex gap-2 justify-between w-full",
        !vertical && "items-center",
        vertical && "flex-col items-start md:flex-row md:items-center",
      )}
    >
      <div className="font-medium">{label}</div>
      <div
        className={classNames(
          "font-light col-span-2 text-[22px]",
          vertical && "w-full md:w-auto",
        )}
      >
        {value ?? "-"}
      </div>
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

  if (windowWidth <= 400) {
    addressLength = 20;
  } else if (windowWidth <= 768) {
    addressLength = 25;
  } else if (windowWidth <= 920) {
    addressLength = 15;
  } else if (windowWidth <= 1200) {
    addressLength = 20;
  }

  return (
    <div
      {...restProps}
      className={classNames(className, "flex items-center justify-end gap-4")}
    >
      <Link
        target="_blank"
        rel="nooppener noreferrer"
        href={blockExplorerContractUrl}
      >
        <span className="text-primary">
          {WalletHelper.getShortAddress(address, addressLength)}
        </span>
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
