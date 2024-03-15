import BaseComponentProps from "@interfaces/base-component-props.interface";
import BlockExplorerLink from "@components/_shared/block-explorer-link/block-explorer-link.component";
import { centerEllipsis } from "@/src/lib/helpers/string.service";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
}

export const WalletAddress = ({
  address,
  className,
  style,
}: WalletAddressProps) => {
  return (
    <div className={className} style={style}>
      <BlockExplorerLink type="address" item={address}>
        {centerEllipsis(address)}
      </BlockExplorerLink>
    </div>
  );
};
