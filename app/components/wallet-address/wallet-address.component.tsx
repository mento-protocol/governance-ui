import WalletHelper from "@/app/helpers/wallet.helper";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { useAccount } from "wagmi";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
}

export const WalletAddress = ({
  address,
  className,
  style,
}: WalletAddressProps) => {
  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;
  const shortAddress = WalletHelper.getShortAddress(address);
  return (
    <div className={className} style={style}>
      {blockExplorerUrl ? (
        <a
          href={`${blockExplorerUrl}/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortAddress}
        </a>
      ) : (
        shortAddress
      )}
    </div>
  );
};
