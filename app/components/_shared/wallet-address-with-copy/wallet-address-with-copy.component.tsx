import BaseComponentProps from "@interfaces/base-component-props.interface";
import { WalletAddress } from "../../wallet-address/wallet-address.component";
import CopyToClipboard from "react-copy-to-clipboard";
import { CopyIcon } from "../../_icons/copy.icon";
import classNames from "classnames";

interface WalletAddressWithCopyProps extends BaseComponentProps {
  address: string;
}

export const WalletAddressWithCopy = ({
  className,
  style,
  address,
}: WalletAddressWithCopyProps) => {
  return (
    <div
      className={classNames(className, "flex items-center gap-x2")}
      style={style}
    >
      <WalletAddress address={address} />
      <CopyToClipboard text={address}>
        <div className="cursor-pointer">
          <CopyIcon />
        </div>
      </CopyToClipboard>
    </div>
  );
};
