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
      // TODO: offset set to 0.25em
      className="underline decoration-from-font underline-offset-4"
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
