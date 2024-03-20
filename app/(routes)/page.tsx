"use client";
import { MentoIcon } from "@components/_icons/mento.icon";
import { CeloLogoIcon } from "@components/_icons";
import { Badge, Button, Card, Divider } from "@components/_shared";
import { ProposalsListComponent } from "@components/proposals-list/proposals-list.component";
import { Loader } from "@components/_shared";
import { ContractParams } from "@components/contract-params/contract-params.component";
import { Suspense } from "react";
import ProposalSummaryComponent from "@components/proposal-summary/proposal-summary.component";
import Link from "next/link";
import { useAccount } from "wagmi";
import Spacer from "../components/_shared/spacer";

const Page = () => {
  const { address } = useAccount();
  return (
    <main className="flex flex-col place-items-center mt-x11 font-fg">
      <Title />
      <Subtitle />
      <Card className="mt-[10px] md:mt-[55px]" block>
        <Card.Header className="!pb-0 flex flex-row justify-between items-center">
          <MentoIconWithLogo />
          <DesktopNavigationButtons disabled={!address} />
        </Card.Header>
        <div className="my-[20px] md:my-[30px]">
          <DesktopTagline />
          <div className="flex items-start flex-col md:flex-row flex-wrap md:items-stretch">
            <MobileNavigationLinks />
            <Spacer className="h-x4 md:hidden" />
            <Badges />
          </div>
        </div>
        <Divider />
        <ContractParams />
      </Card>
      <Suspense fallback={<Loader isCenter />}>
        <ProposalSummaryComponent />
      </Suspense>
      <Suspense fallback={<Loader isCenter />}>
        <ProposalsListComponent />
      </Suspense>
    </main>
  );
};

const MobileNavigationLinks = () => (
  <>
    <Link className="md:hidden text-primary underline" href="/my-voting-power">
      My voting power
    </Link>
  </>
);

const Badges = () => (
  <>
    <Badge rounded type="tertiary">
      <CeloLogoIcon />
      &nbsp;CELO Mainnet
    </Badge>
    <Spacer className="h-x3 md:hidden" />
    <Spacer axis="vertical" className="w-x3 hidden md:block" />
    <Badge rounded type="secondary">
      MENTO {(1_000_000_000).toLocaleString()} Supply
    </Badge>
  </>
);

const DesktopTagline = () => (
  <p className="mb-[20px] md:mb-[30px]">Transparent Digital Asset Solutions</p>
);

const MentoIconWithLogo = () => (
  <div className="flex flex-row justify-start place-items-center gap-x3 font-size-x6 sm:font-size-x11">
    <MentoIcon
      className="w-[35px] md:w-[62px]"
      shouldChangeWithTheme={false}
      backgroundColor="#A5E5F7"
    />
    <span className="font-medium text-[32px] md:text-[56px] pt-[9px] md:pt-[18px]">
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
    <Button theme="clear" href="/my-voting-power" disabled={disabled}>
      My voting power
    </Button>
  </div>
);

const Title = () => (
  <h1 className="text-[32px] leading-[32px] text-center md:text-[56px] md:leading-[56px] font-bold">
    MENTO
    <br className="md:hidden" />
    <span className="header_text text-transparent md:pl-3">GOVERNANCE</span>
  </h1>
);

const Subtitle = () => (
  <h2 className="text-[22px] leading-[22px] md:text-[32px] md:leading-[32px] mt-x3 md:mt-x6 font-medium text-center max-w-[300px]  md:max-w-[17em]">
    Participate in the governance process of Mento stablecoin platform
  </h2>
);

export default Page;
