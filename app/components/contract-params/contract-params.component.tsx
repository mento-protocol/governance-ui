"use client";
import React from "react";
import classNames from "classnames";
import { JsonRpcProvider } from "@ethersproject/providers";
import Link from "next/link";
import { Governance, getContractsByChainId } from "@mento-protocol/mento-sdk";
import CopyToClipboard from "react-copy-to-clipboard";
import { useQuery } from "@tanstack/react-query";
import { readContract } from "viem/actions";
import { celo } from "viem/chains";
import { http, createClient } from "viem";
import { type Chain } from "viem";
import { useAccount } from "wagmi";

import { Card } from "@components/_shared";
import NumbersService from "@/app/helpers/numbers.service";
import WalletHelper from "@/app/helpers/wallet.helper";
import { CopyIcon } from "../_icons/copy.icon";

export const ContractParams = () => {
  const { chain } = useAccount();
  const connectedChainOrMainnet = chain ?? celo;

  const { data } = useQuery({
    queryKey: [connectedChainOrMainnet],
    queryFn: async () => {
      return await getGovernanceDetails(connectedChainOrMainnet);
    },
  });

  return (
    <div className="grid grid-cols-1 gap-x1 md:grid-cols-7 px-x4 pt-x4">
      <Card className="md:col-span-3 flex flex-col">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Parameters
          </div>
        </Card.Header>
        <div className="flex flex-col flex-grow justify-between gap-[15px]">
          <ParamDisplay
            label="Proposal threshold"
            value={data?.proposalThreshold}
          />
          <ParamDisplay label="Quorum needed" value={data?.quorumNeeded} />

          <ParamDisplay
            label="Voting period"
            value={data ? <span>{`${data?.votingPeriod} days`}</span> : null}
          />
          <ParamDisplay
            label="Timelock"
            value={data ? <span>{`${data?.timelock} days`}</span> : null}
          />
        </div>
      </Card>
      <Card className="md:col-span-4 flex flex-col">
        <Card.Header>
          <div className="color-primary text-x4 font-medium mb-x6">
            Contract addresses
          </div>
        </Card.Header>
        <div className="flex flex-col flex-grow justify-between gap-[15px]">
          <ParamDisplay
            label="Govener"
            value={
              data ? (
                <ContractAddressLinkWithCopy
                  address={data?.contracts?.MentoGovernor}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Token"
            value={
              data ? (
                <ContractAddressLinkWithCopy
                  address={data?.contracts?.MentoToken}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Timelock"
            value={
              data ? (
                <ContractAddressLinkWithCopy
                  address={data?.contracts?.TimelockController}
                />
              ) : null
            }
          />
          <ParamDisplay
            label="Locker"
            value={
              data ? (
                <ContractAddressLinkWithCopy
                  address={data?.contracts?.Locking}
                />
              ) : null
            }
          />
        </div>
      </Card>
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
    <div className="flex gap-8 justify-between items-center">
      <div className="font-semibold">{label}</div>
      <div className="text-right col-span-2 break-all">{value ?? "-"}</div>
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
  const connectedChainOrMainnet = chain ?? celo;
  const blockExplorerUrl = connectedChainOrMainnet.blockExplorers?.default.url;
  const blockExplorerContractUrl = `${blockExplorerUrl}/address/${address}`;
  const windowWidth = useWindowWidth();
  let length;

  if (!address) {
    return;
  }

  if (windowWidth <= 600) {
    length = 15;
  } else if (windowWidth <= 1200) {
    length = 20;
  } else {
    length = 30;
  }

  return (
    <div
      {...restProps}
      className={classNames(className, "flex items-center gap-8")}
    >
      <Link href={blockExplorerContractUrl}>
        {WalletHelper.getShortAddress(address, length)}
      </Link>
      <CopyToClipboard text={address}>
        <div className="cursor-pointer">
          <CopyIcon />
        </div>
      </CopyToClipboard>
    </div>
  );
};

async function createProvider(chain: Chain) {
  const rpcUrl = chain.rpcUrls.default.http[0];
  return new JsonRpcProvider(rpcUrl);
}

async function createGovernance(provider: JsonRpcProvider) {
  return new Governance(provider).getGovernorContract();
}

async function getGovernanceDetails(chain: Chain) {
  const provider = await createProvider(chain);
  const governorContract = await createGovernance(provider);

  if (governorContract.address === "") {
    return null;
  }

  const timelockContractAddress = await governorContract.timelock();
  const votingPeriod = await governorContract.votingPeriod();
  const proposalThreshold = await governorContract.proposalThreshold();
  const quorumNeeded = await governorContract.quorumVotes();
  const contracts = getContractsByChainId(chain.id);

  const timeLockDuration = await getTimeLockDurationInSecondsForChain(
    chain,
    timelockContractAddress
  );

  const timelockInDays = convertSecondsToDays(Number(timeLockDuration));
  const votingPeriodInDays = convertSecondsToDays(
    convertCeloBlocksToSeconds(Number(votingPeriod))
  );

  return {
    votingPeriod: votingPeriodInDays.toString(),
    timelock: timelockInDays.toString(),
    proposalThreshold: NumbersService.parseNumericValue(
      proposalThreshold.toString(),
      2
    ).toString(),
    quorumNeeded: NumbersService.parseNumericValue(
      quorumNeeded.toString()
    ).toString(),
    contracts,
  };
}

async function getTimeLockDurationInSecondsForChain(
  chain: Chain,
  timelockContractAddress: string
) {
  const timeLockControllerAbi = [
    {
      inputs: [],
      name: "getMinDelay",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ] as const;

  const config = createClient({
    chain,
    transport: http(),
  });
  return await readContract(config, {
    abi: timeLockControllerAbi,
    address: timelockContractAddress as `0x${string}`,
    functionName: "getMinDelay",
  });
}

function convertCeloBlocksToSeconds(numBlocks: number): number {
  const blocksPerWeek = 120960;
  const secondsPerWeek = 7 * 24 * 60 * 60; // 7 days in seconds

  // Calculate the duration of one block in seconds
  const secondsPerBlock = secondsPerWeek / blocksPerWeek;

  // Calculate total duration in seconds for the given number of blocks
  return numBlocks * secondsPerBlock;
}

function convertSecondsToDays(durationInSeconds: number): number {
  const secondsPerDay = 24 * 60 * 60;
  const days = durationInSeconds / secondsPerDay;
  return Math.floor(days);
}

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = React.useState<number>(
    window.innerWidth
  );

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
}
