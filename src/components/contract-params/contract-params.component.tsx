"use client";
import React, { Suspense } from "react";
import classNames from "classnames";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";

import { Card, Expandable, Loader } from "@/components/_shared";
import { CopyIcon } from "@/components/_icons/copy.icon";
import { Celo } from "@/config/chains";
import { useContracts } from "@/lib/contracts/useContracts";
import useGovernanceDetails from "@/lib/contracts/governor/useGovernanceDetails";

export const ContractParams = () => {
  const governanceDetails = useGovernanceDetails();
  const {
    MentoToken: { address: mentoAddress },
    TimelockController: { address: timelockAddress },
    MentoGovernor: { address: governorAddress },
    Locking: { address: lockingAddress },
  } = useContracts();

  return (
    <Expandable
      header={"Governance Parameters"}
      className="font-size-x4 font-medium"
    >
      <Suspense fallback={<Loader isCenter />}>
        <div className="gap-x2 md:pt-x4 grid grid-cols-1 md:grid-cols-7">
          <Card
            noBorderMobile
            className="gap-x4 md:gap-x6 flex flex-col md:col-span-3"
          >
            <Card.Header>
              <div className="text-center text-primary md:text-left">
                Parameters
              </div>
            </Card.Header>
            <div className="gap-x3 flex flex-grow flex-col justify-between">
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
          <Card
            noBorderMobile
            className="gap-x4 md:gap-x6 flex flex-col md:col-span-4"
          >
            <Card.Header>
              <div className="text-center text-primary md:text-left">
                Contract addresses
              </div>
            </Card.Header>
            <div className="flex flex-grow flex-col justify-between gap-[15px]">
              <ParamDisplay
                label="Governor"
                value={
                  governorAddress && (
                    <ContractAddressLinkWithCopy address={governorAddress} />
                  )
                }
              />
              <ParamDisplay
                label="MENTO"
                value={
                  mentoAddress && (
                    <ContractAddressLinkWithCopy address={mentoAddress} />
                  )
                }
              />
              <ParamDisplay
                label="Timelock"
                value={
                  timelockAddress && (
                    <ContractAddressLinkWithCopy address={timelockAddress} />
                  )
                }
              />
              <ParamDisplay
                label="veMENTO"
                value={
                  lockingAddress && (
                    <ContractAddressLinkWithCopy address={lockingAddress} />
                  )
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
}: {
  label: string;
  value: React.ReactNode | undefined;
}) => {
  return (
    <div
      className={classNames(
        "flex w-full flex-wrap items-center justify-between gap-2 md:flex-nowrap",
      )}
    >
      <div className="text-[16px] leading-[19px] md:text-[22px] md:leading-[22px]">
        {label}
      </div>
      <div
        className={classNames(
          "flex-grow text-right text-[16px] font-normal leading-[19px] md:text-[22px] md:leading-[22px]",
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

  if (!address) {
    return;
  }

  return (
    <div
      {...restProps}
      className={classNames(
        className,
        "flex h-[22px] w-full items-center justify-end gap-4",
      )}
    >
      <Link
        target="_blank"
        rel="nooppener noreferrer"
        href={blockExplorerContractUrl}
        className="gap-8 overflow-visible text-[16px] font-normal leading-[19px] text-primary md:text-[22px] md:leading-[22px]"
      >
        <AddressComponent address={address} />
      </Link>
      <CopyToClipboard text={address}>
        <span className="mb-2 h-[29px] shrink-0">
          <CopyIcon className="h-full" />
        </span>
      </CopyToClipboard>
    </div>
  );
};

const AddressComponent = ({ address }: { address: string }) => {
  // Assuming the requirement is to always show the last 4 characters of the address
  const start = address.toUpperCase().slice(0, -4);
  const end = address.toUpperCase().slice(-4);

  return (
    <div className="flex max-w-[300px] shrink items-center justify-start md:max-w-[350px]  lg:max-w-[400px]">
      <span className="m-0 shrink overflow-x-clip text-ellipsis whitespace-nowrap p-0">
        {start}
      </span>
      <span className="shrink-0">{end}</span>
    </div>
  );
};
