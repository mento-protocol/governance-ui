import classNames from "classnames";
import { useAccount } from "wagmi";
import styles from "./block-explorer-link.module.scss";

type Props = {
  children: React.ReactNode;
  type: "address" | "tx" | "block";
  item: string;
};

function BlockExplorerLink({ children, type, item }: Props) {
  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  return blockExplorerUrl ? (
    <a
      className={classNames("underline", "decoration-from-font", styles.link)}
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
