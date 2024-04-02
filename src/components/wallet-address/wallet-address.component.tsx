import BaseComponentProps from "@/interfaces/base-component-props.interface";
import BlockExplorerLink from "@/components/_shared/block-explorer-link/block-explorer-link.component";
import { centerEllipsis } from "@/lib/helpers/string.service";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
}

export const WalletAddress = ({ address, className }: WalletAddressProps) => {
  return (
    <div className={className}>
      <BlockExplorerLink type="address" item={address}>
        {centerEllipsis(address)}
      </BlockExplorerLink>
    </div>
  );
};
