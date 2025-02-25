"use client";
import { useAccount } from "wagmi";
import { Divider } from "@/components/_shared";
import {
  Badges,
  ContractParams,
  ProposalSummaryComponent,
  ProposalsListComponent,
} from "@/components/index";
import Link from "next/link";
import {
  Button,
  ButtonProps,
  cn,
  MentoIcon,
  Card,
  CardHeader,
} from "@mento-protocol/ui-toolkit";

export default function Page() {
  return (
    <main className="mt-x11 mb-[100px] flex flex-col place-items-center font-fg">
      <Title />
      <Subtitle />
      <Card className="mt-8 md:mt-[55px]" block>
        <CardHeader className="flex flex-row items-center justify-between !pb-0">
          <MentoIconWithLogo />
          <DesktopNavigationButtons />
        </CardHeader>
        <div className="my-[20px] md:my-[30px]">
          <DesktopTagline />
          <div className="flex flex-col flex-wrap items-start md:flex-row md:items-stretch">
            <MobileNavigationLinks className="mb-5 md:hidden" />
            <Badges />
          </div>
        </div>
        <Divider />
        <ContractParams />
      </Card>
      <ProposalSummaryComponent />
      <ProposalsListComponent />
    </main>
  );
}

const MobileNavigationLinks = ({ className }: ButtonProps) => {
  const { address } = useAccount();
  const isDisabled = !address;

  return (
    <Link
      className={cn(
        "text-mento-blue text-lg/[18px] underline ",
        isDisabled && "text-gray  pointer-events-none cursor-not-allowed",
        className,
      )}
      href={isDisabled ? "#" : "/voting-power"}
    >
      My voting power
    </Link>
  );
};
const DesktopTagline = () => (
  <p className="mb-[20px] text-[18px] md:mb-[30px] md:text-[22px]">
    Transparent Digital Asset Solutions
  </p>
);

const MentoIconWithLogo = () => (
  <div className="font-size-x6 sm:font-size-x11 gap-x3 flex flex-row place-items-center justify-start">
    <MentoIcon className="w-[35px] md:w-[62px]" backgroundColor="cyan" />
    <span className="text-[32px] font-medium  md:text-[56px]">Mento</span>
  </div>
);

const DesktopNavigationButtons = () => {
  return (
    <div className="gap-x3 hidden md:flex">
      <Button theme="clear" href="/create-proposal">
        Create new proposal
      </Button>
      <Button theme="clear" href="/voting-power">
        My voting power
      </Button>
    </div>
  );
};

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
  <h2 className="mt-x3  md:mt-x6 max-w-[300px] text-center text-[22px] font-medium leading-[22px] md:max-w-[17em] md:text-[32px]  md:leading-[32px]">
    Participate in the governance process of Mento stablecoin platform
  </h2>
);
