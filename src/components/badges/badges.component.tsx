"use client";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { CeloLogoIcon, Badge } from "@mento-protocol/ui-toolkit";

export const Badges = () => {
  const {
    mentoContractData: { totalSupply, decimals },
  } = useTokens();

  const { chain } = useAccount();

  return (
    <div className="flex flex-col gap-x3 md:flex-row">
      <Badge type="outline">
        <CeloLogoIcon />
        &nbsp;{chain?.name || "Celo"}&nbsp;
        {chain?.testnet ? "Testnet" : "Mainnet"}
      </Badge>
      <Badge type="secondary">
        MENTO{" "}
        {NumbersService.parseNumericValue(formatUnits(totalSupply, decimals))}{" "}
        Supply
      </Badge>
    </div>
  );
};
