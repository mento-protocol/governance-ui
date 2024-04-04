"use client";
import React, { ComponentProps, Suspense, useMemo } from "react";
import classNames from "classnames";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { useAccount } from "wagmi";

import { Card, Expandable, Loader } from "@/components/_shared";
import { CopyIcon } from "@/components/_icons/copy.icon";
import { Celo } from "@/config/chains";
import { useContracts } from "@/lib/contracts/useContracts";
import useGovernanceDetails from "@/lib/contracts/governor/useGovernanceDetails";
import NumbersService from "@/lib/helpers/numbers.service";
import { Address } from "viem";

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
      title={"Governance Parameters"}
      className="font-size-x4 items-start font-medium md:pt-x4"
    >
      <Suspense fallback={<Loader isCenter />}>
        <div className="grid grid-cols-1 gap-x2 md:grid-cols-7 md:pt-x4">
          <Card
            noBorderMobile
            className="flex flex-col gap-x4 md:col-span-3 md:gap-x6"
          >
            <Card.Header>
              <div className="text-center text-primary md:text-left">
                Parameters
              </div>
            </Card.Header>
            <div className="flex flex-grow flex-col justify-between gap-x3">
              <ParamDisplay
                label="Proposal threshold"
                value={NumbersService.parseNumericValue(
                  governanceDetails?.proposalThreshold
                    ? governanceDetails.proposalThreshold
                    : 0,
                  2,
                )}
              />
              <ParamDisplay
                label="Quorum needed"
                value={NumbersService.parseNumericValue(
                  governanceDetails?.quorumNeeded
                    ? governanceDetails.quorumNeeded
                    : 0,
                  2,
                )}
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
            className="flex flex-col gap-x4 md:col-span-4 md:gap-x6"
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
}: {
  address: Address | undefined;
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
    <Link
      target="_blank"
      rel="nooppener noreferrer"
      href={blockExplorerContractUrl}
      className={`${className} relative inline-block pr-x5`}
    >
      <AddressComponent address={address} />
      <CopyToClipboard text={address}>
        <CopyIcon
          height={20}
          width={20}
          className="absolute right-0 top-[50%] translate-y-[-50%]"
        />
      </CopyToClipboard>
    </Link>
  );
};

const AddressComponent = ({
  address,
  className,
}: ComponentProps<"span"> & { address: Address }) => {
  const { left, right } = useMemo(() => {
    const splitIndex = 32; // Round(42 / 0.75)
    return {
      left: address.slice(0, splitIndex),
      right: address.slice(-splitIndex),
    };
  }, [address]);

  return (
    <span className={`${className} inline-flex`}>
      <span className="max-w-[21ch] flex-[0_1_auto] overflow-hidden text-ellipsis whitespace-pre">
        {left}
      </span>
      <span className="max-w-[21ch] flex-[1_0_auto] overflow-hidden whitespace-pre">
        {right}
      </span>
    </span>
  );
};
