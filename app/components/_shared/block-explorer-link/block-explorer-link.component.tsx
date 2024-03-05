import classNames from "classnames";
import { useAccount } from "wagmi";

type Props = {
  children: React.ReactNode;
  type: "address" | "tx" | "block";
  item: string;
  className?: string;
};

function BlockExplorerLink({ children, type, item, className }: Props) {
  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  return blockExplorerUrl ? (
    <a
      className={classNames("underline decoration-from-font", className)}
      href={`${blockExplorerUrl}/${type}/${item}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    children
  );
}

export default BlockExplorerLink;
