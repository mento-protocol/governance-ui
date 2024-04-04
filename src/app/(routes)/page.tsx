"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";

import { CeloLogoIcon, MentoIcon } from "@/components/_icons";
import {
  Badge,
  Button,
  Card,
  Divider,
  Loader,
  Spacer,
} from "@/components/_shared";
import { ProposalsListComponent } from "@/components/proposals-list/proposals-list.component";
import { ContractParams } from "@/components/contract-params/contract-params.component";
import ProposalSummaryComponent from "@/components/proposal-summary/proposal-summary.component";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";
import { formatUnits } from "viem";

const Page = () => {
  const { address } = useAccount();
  return (
    <main className="mt-x11 flex flex-col place-items-center font-fg">
      <Title />
      <Subtitle />
      <Card className="mt-[10px] md:mt-[55px]" block>
        <Card.Header className="flex flex-row items-center justify-between !pb-0">
          <MentoIconWithLogo />
          <DesktopNavigationButtons disabled={!address} />
        </Card.Header>
        <div className="my-[20px] md:my-[30px]">
          <DesktopTagline />
          <div className="flex flex-col flex-wrap items-start md:flex-row md:items-stretch">
            <MobileNavigationLinks />
            <Spacer className="h-x4 md:hidden" />
            <Badges />
          </div>
        </div>
        <Divider />
        <ContractParams />
      </Card>
      <Suspense fallback={<Loader className="mt-7" isCenter />}>
        <ProposalSummaryComponent />
        <ProposalsListComponent />
      </Suspense>
    </main>
  );
};

const MobileNavigationLinks = () => (
  <>
    <Link className="text-primary underline md:hidden" href="/my-voting-power">
      My voting power
    </Link>
  </>
);

const Badges = () => {
  const {
    mentoContractData: { totalSupply, decimals },
  } = useTokens();
  return (
    <div className="flex gap-x3">
      <Badge type="outline">
        <CeloLogoIcon />
        &nbsp;CELO Mainnet
      </Badge>
      <Badge type="secondary">
        MENTO{" "}
        {NumbersService.parseNumericValue(formatUnits(totalSupply, decimals))}{" "}
        Supply
      </Badge>
    </div>
  );
};

const DesktopTagline = () => (
  <p className="mb-[20px] md:mb-[30px]">Transparent Digital Asset Solutions</p>
);

const MentoIconWithLogo = () => (
  <div className="font-size-x6 sm:font-size-x11 flex flex-row place-items-center justify-start gap-x3">
    <MentoIcon className="w-[35px] md:w-[62px]" backgroundColor="cyan" />
    <span className="pt-[9px] text-[32px] font-medium md:pt-[18px] md:text-[56px]">
      Mento
    </span>
  </div>
);

const DesktopNavigationButtons = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => (
  <div className="hidden gap-x3 md:flex">
    <Button theme="clear" href="/create-proposal">
      Create new proposal
    </Button>
    <Button theme="primary" href="/my-voting-power" disabled={disabled}>
      My voting power
    </Button>
  </div>
);

const Title = () => {
  return (
    <h1 className="text-center text-[32px] font-bold leading-[32px] md:flex md:gap-1 md:text-[56px] md:leading-[56px]">
      MENTO
      <br className="md:hidden" />
      <span
        className={`text-transparent [-webkit-text-stroke:1.2px_black] dark:[-webkit-text-stroke:1.2px_white]`}
      >
        GOVERNANCE
      </span>
    </h1>
  );
};

const Subtitle = () => (
  <h2 className="mt-x3 max-w-[300px] text-center text-[22px] font-medium leading-[22px] md:mt-x6 md:max-w-[17em] md:text-[32px]  md:leading-[32px]">
    Participate in the governance process of Mento stablecoin platform
  </h2>
);

export default Page;
