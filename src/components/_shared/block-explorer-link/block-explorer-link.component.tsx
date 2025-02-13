import { cn } from "@mento-protocol/ui-toolkit";
import { celo } from "viem/chains";
import { useAccount } from "wagmi";

type Props = {
  children: React.ReactNode;
  type: "address" | "tx" | "block";
  item: string;
  className?: string;
};

export const BlockExplorerLink = ({
  children,
  type,
  item,
  className,
}: Props) => {
  const { chain } = useAccount();

  const blockExplorerUrl =
    chain?.blockExplorers?.default.url ?? celo.blockExplorers.default.url;

  return (
    <a
      // TODO: offset set to 0.25em
      className={cn(
        "underline decoration-from-font underline-offset-4",
        className,
      )}
      href={`${blockExplorerUrl}/${type}/${item}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
