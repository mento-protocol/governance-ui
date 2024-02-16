import WalletHelper from "@/app/helpers/wallet.helper";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import BlockExplorerLink from "../_shared/block-explorer-link/block-explorer-link.component";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
}

export const WalletAddress = ({
  address,
  className,
  style,
}: WalletAddressProps) => {
  const shortAddress = WalletHelper.getShortAddress(address);
  return (
    <div className={className} style={style}>
      <BlockExplorerLink type="address" item={address}>
        {shortAddress}
      </BlockExplorerLink>
    </div>
  );
};
