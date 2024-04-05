import classNames from "classnames";
import CopyToClipboard from "react-copy-to-clipboard";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { WalletAddress } from "@/components/index";
import { CopyIcon } from "@/components/_icons/copy.icon";

interface WalletAddressWithCopyProps extends BaseComponentProps {
  address: string;
}

export const WalletAddressWithCopy = ({
  className,
  address,
}: WalletAddressWithCopyProps) => {
  return (
    <div className={classNames(className, "flex items-center gap-x2")}>
      <WalletAddress address={address} />
      <CopyToClipboard text={address}>
        <div className="cursor-pointer">
          <CopyIcon />
        </div>
      </CopyToClipboard>
    </div>
  );
};
