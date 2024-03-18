"use client";
import { MentoIcon } from "@components/_icons/mento.icon";
import { CeloLogoIcon } from "@components/_icons";
import { Badge, Button, Card, Divider, Expandable } from "@components/_shared";
import { ProposalsListComponent } from "@components/proposals-list/proposals-list.component";
import { Loader } from "@components/_shared";
import { ContractParams } from "@components/contract-params/contract-params.component";
import { Suspense } from "react";
import ProposalSummaryComponent from "@components/proposal-summary/proposal-summary.component";
import Link from "next/link";
import { useAccount } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  return (
    <main className="flex flex-col place-items-center mt-x11 font-fg">
      <h1 className="font-size-x8 text-center md:font-size-x11 font-bold leading-2 md:leading-loose tracking-wide whitespace-break-spaces">
        MENTO
        <br className="md:hidden" />
        <span className="header_text text-transparent md:pl-3">GOVERNANCE</span>
      </h1>
      <h2 className="font-size-x6 line-height-x6 mt-x6 font-medium text-center max-w-[17em]">
        Participate in the governance process of Mento stablecoin platform
      </h2>

      <Card className="mt-x11" block>
        <Card.Header className="!pb-0">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start place-items-center gap-x3 font-size-x6 sm:font-size-x11">
              <MentoIcon
                shouldChangeWithTheme={false}
                backgroundColor="#A5E5F7"
              />
              <span className="font-medium">Mento</span>
            </div>
            <div className="hidden gap-x3 md:flex">
              <Button theme="clear" href="/create-proposal">
                Create new proposal
              </Button>
              <Button theme="clear" href="/my-voting-power" disabled={!address}>
                My voting power
              </Button>
            </div>
          </div>
        </Card.Header>
        <div className="my-x6">
          <p className="mb-x6 text-x4">Transparent Digital Asset Solutions</p>
          <div className="flex items-start flex-col md:flex-row flex-wrap gap-x3">
            <Link
              className="md:hidden text-primary underline mb-x2"
              href="/my-voting-power"
            >
              My voting power
            </Link>
            <Badge rounded type="tertiary">
              <CeloLogoIcon />
              &nbsp;CELO
            </Badge>
            <Badge rounded type="secondary">
              MENTO {(1_000_000_000).toLocaleString()} Supply
            </Badge>
          </div>
        </div>
        <Divider />
        <Expandable
          header={"Contract parameters"}
          className="font-medium font-size-x4"
        >
          <Suspense fallback={<Loader isCenter />}>
            <ContractParams />
          </Suspense>
        </Expandable>
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

export default Page;
