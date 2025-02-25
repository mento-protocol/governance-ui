"use client";
import React, { Suspense } from "react";

import { WalletAddressWithCopy } from "@/components/_shared";
import { useContracts } from "@/lib/contracts/useContracts";
import useGovernanceDetails from "@/lib/contracts/governor/useGovernanceDetails";
import NumbersService from "@/lib/helpers/numbers.service";
import { Address, formatUnits } from "viem";
import {
  Card,
  CardHeader,
  Expandable,
  Loader,
} from "@mento-protocol/ui-toolkit";

export const ContractParams = () => {
  const {
    proposalThreshold,
    quorumNeeded,
    votingPeriodFormatted,
    timeLockFormatted,
  } = useGovernanceDetails();
  const {
    MentoToken: { address: mentoAddress },
    TimelockController: { address: timelockAddress },
    MentoGovernor: { address: governorAddress },
    Locking: { address: lockingAddress },
  } = useContracts();

  return (
    <Expandable
      title={"Governance Parameters"}
      className="md:pt-x4 items-start text-[18px] font-medium md:text-[22px]"
    >
      <Suspense fallback={<Loader isCenter />}>
        <div className="gap-x2 pt-x3 lg:pt-x4 grid grid-cols-1 lg:grid-cols-7 ">
          <Card
            noBorderMobile
            className="gap-x4 md:gap-x6 flex flex-col md:col-span-3"
          >
            <CardHeader>
              <div className="text-primary text-center md:text-left">
                Parameters
              </div>
            </CardHeader>
            <div className="gap-x3 flex flex-grow flex-col justify-between">
              <ParamsDisplay
                items={[
                  {
                    label: "Proposal threshold",
                    value: proposalThreshold
                      ? NumbersService.parseNumericValue(
                          formatUnits(BigInt(proposalThreshold), 18),
                          2,
                        )
                      : "-",
                  },
                  {
                    label: "Quorum needed",
                    value: quorumNeeded
                      ? NumbersService.parseNumericValue(
                          formatUnits(quorumNeeded, 18),
                          2,
                        )
                      : "-",
                  },
                  {
                    label: "Voting period",
                    value: votingPeriodFormatted || "-",
                  },
                  {
                    label: "Timelock",
                    value: timeLockFormatted || "-",
                  },
                ]}
              />
            </div>
          </Card>
          <Card
            noBorderMobile
            className="gap-x4 md:gap-x6 flex flex-col md:col-span-4"
          >
            <CardHeader>
              <div className="text-primary text-center md:text-left">
                Contract addresses
              </div>
            </CardHeader>
            <div className="flex flex-grow flex-col justify-between gap-[15px]">
              <ParamsDisplay
                items={[
                  {
                    label: "Governor",
                    value: (
                      <ContractAddressLinkWithCopy address={governorAddress} />
                    ),
                  },
                  {
                    label: "MENTO",
                    value: (
                      <ContractAddressLinkWithCopy address={mentoAddress} />
                    ),
                  },
                  {
                    label: "Timelock",
                    value: (
                      <ContractAddressLinkWithCopy address={timelockAddress} />
                    ),
                  },
                  {
                    label: "veMENTO",
                    value: (
                      <ContractAddressLinkWithCopy address={lockingAddress} />
                    ),
                  },
                ]}
              />
            </div>
          </Card>
        </div>
      </Suspense>
    </Expandable>
  );
};

const ParamsDisplay = ({
  items,
}: {
  items: {
    label: string;
    value: React.ReactNode | undefined;
  }[];
}) => {
  return (
    <div className="grid grid-cols-[max-content_1fr] justify-items-stretch gap-x-8 gap-y-4 md:flex-nowrap">
      {items.map((item, index) => (
        <ParamDisplay key={index} label={item.label} value={item.value} />
      ))}
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
    <>
      <div className="text-[16px] leading-[19px] md:text-[22px] md:leading-[22px]">
        {label}
      </div>
      <div className="text-right text-base/[19px] font-normal md:text-[22px]/[22px]">
        {value ?? "-"}
      </div>
    </>
  );
};

const ContractAddressLinkWithCopy = ({
  address,
}: {
  address: Address | undefined;
}) => {
  if (!address) {
    return "-";
  }

  return (
    <WalletAddressWithCopy
      className="pr-x1 text-mento-blue relative items-center justify-end no-underline"
      address={address}
      remaining={15}
    />
  );
};

// Parking this in place of explicit trimming
// const AddressComponent = ({
//   address,
//   className,
// }: ComponentProps<"span"> & { address: Address }) => {
//   const { left, right } = useMemo(() => {
//     const splitIndex = 21;
//     return {
//       left: address.slice(0, splitIndex),
//       right: address.slice(-splitIndex),
//     };
//   }, [address]);

//   return (
//     <span className={`${className} flex`}>
//       <span className="flex-[1_1_auto] overflow-hidden text-ellipsis whitespace-pre">
//         {left}
//       </span>
//       <span className="flex-[1_1_auto] overflow-hidden whitespace-pre text-right [direction:rtl]">
//         {right}
//       </span>
//     </span>
//   );
// };
