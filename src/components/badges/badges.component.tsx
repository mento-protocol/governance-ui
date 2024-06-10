"use client";
import { CeloLogoIcon } from "@/components/_icons";
import { Badge } from "@/components/_shared";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";

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
