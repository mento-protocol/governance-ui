"use client";
import { MentoIcon } from "@components/_icons/mento.icon";
import { MentoTextLogoIcon, CeloLogoIcon } from "@components/_icons";
import {
  Badge,
  Button,
  Card,
  Divider,
  DropdownButton,
  Expandable,
} from "@components/_shared";
import { ProposalsListComponent } from "@components/proposals-list/proposals-list.component";
import { Loader } from "@components/_shared";
import { ContractParams } from "@components/contract-params/contract-params.component";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store";
import { Suspense } from "react";
import ProposalSummaryComponent from "@components/proposal-summary/proposal-summary.component";
import { useAccount } from "wagmi";

const Page = () => {
  const router = useRouter();
  const { walletAddress } = useUserStore();
  const { chain } = useAccount();

  const chainKind = chain?.testnet ? "Testnet" : "Mainnet";
  const chainText = chain?.name ? chain.name : "CELO";

  return (
    <main className="flex flex-col place-items-center mt-x11">
      <div className="max-w-full">
        <MentoTextLogoIcon className="max-w-full" useThemeColor />
      </div>
      <h2 className="font-size-x6 line-height-x6 mt-x6 font-medium">
        Claim your part and participate in
        <br /> shaping the future of digital assets
      </h2>

      <Card className="mt-x11" block>
        <Card.Header className="!pb-0">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-start place-items-center gap-x3 font-bold font-size-x6 sm:font-size-x11">
              <MentoIcon
                shouldChangeWithTheme={false}
                backgroundColor="#A5E5F7"
              />
              Mento
            </div>
            <div className="hidden gap-x3 md:flex">
              <Button theme="clear" href="/create-proposal">
                Create new proposal
              </Button>
              <Button
                theme="clear"
                href="/my-voting-power"
                disabled={!walletAddress}
              >
                My voting power
              </Button>
            </div>
            <DropdownButton className="md:hidden">
              <DropdownButton.Dropdown>
                <DropdownButton.Element
                  onClick={() => router.push("/create-proposal")}
                >
                  Create new proposal
                </DropdownButton.Element>
                <DropdownButton.Element
                  onClick={() => router.push("/my-voting-power")}
                >
                  My voting power
                </DropdownButton.Element>
              </DropdownButton.Dropdown>
            </DropdownButton>
          </div>
        </Card.Header>
        <div className="my-x6">
          <p className="mb-x6 text-x4">Transparent Digital Asset Solutions</p>
          <div className="flex flex-wrap flex-row gap-x3">
            <Badge rounded type="tertiary">
              <CeloLogoIcon />
              &nbsp; {chainText} {chainKind}
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
