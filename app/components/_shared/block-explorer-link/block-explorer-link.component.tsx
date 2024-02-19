import { useAccount } from "wagmi";

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
      className="underline decoration-from-font"
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
