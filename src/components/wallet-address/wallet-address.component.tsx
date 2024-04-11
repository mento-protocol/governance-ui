import { BlockExplorerLink } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { centerEllipsis } from "@/lib/helpers/string.service";

interface WalletAddressProps extends BaseComponentProps {
  address: string;
}

export const WalletAddress = ({ address, className }: WalletAddressProps) => {
  return (
    <div className={className}>
      <BlockExplorerLink className="no-underline" type="address" item={address}>
        {centerEllipsis(address)}
      </BlockExplorerLink>
    </div>
  );
};
