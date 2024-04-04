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
      className="font-medium font-size-x4"
    >
      <Suspense fallback={<Loader isCenter />}>
        <div className="grid grid-cols-1 gap-x2 md:grid-cols-7 md:pt-x4">
          <Card
            noBorderMobile
            className="md:col-span-3 flex flex-col gap-x4 md:gap-x6"
          >
            <Card.Header>
              <div className="text-primary text-center md:text-left">
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
          <Card
            noBorderMobile
            className="md:col-span-4 flex flex-col gap-x4 md:gap-x6"
          >
            <Card.Header>
              <div className="text-primary text-center md:text-left">
                Contract addresses
              </div>
            </Card.Header>
            <div className="flex flex-col flex-grow justify-between gap-[15px]">
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
        "flex gap-2 justify-between items-center w-full flex-wrap md:flex-nowrap",
      )}
    >
      <div className="text-[16px] leading-[19px] md:text-[22px] md:leading-[22px]">
        {label}
      </div>
      <div
        className={classNames(
          "font-normal text-[16px] leading-[19px] md:text-[22px] md:leading-[22px] flex-grow text-right",
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
        "flex items-center gap-4 w-full justify-end h-[22px]",
      )}
    >
      <Link
        target="_blank"
        rel="nooppener noreferrer"
        href={blockExplorerContractUrl}
        className="text-primary overflow-visible gap-8 font-normal text-[16px] leading-[19px] md:text-[22px] md:leading-[22px]"
      >
        <AddressComponent address={address} />
      </Link>
      <CopyToClipboard text={address}>
        <span className="h-[29px] shrink-0 mb-2">
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
    <div className="flex items-center justify-start shrink max-w-[300px] md:max-w-[350px]  lg:max-w-[400px]">
      <span className="text-ellipsis whitespace-nowrap shrink overflow-x-clip m-0 p-0">
        {start}
      </span>
      <span className="shrink-0">{end}</span>
    </div>
  );
};
