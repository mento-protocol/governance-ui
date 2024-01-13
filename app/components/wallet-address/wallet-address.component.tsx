import BaseComponentProps from "@interfaces/base-component-props.interface";
import WalletHelper from "@/app/helpers/wallet.helper";

interface WalletAddressProps extends BaseComponentProps {
    address: string;
}

export const WalletAddress = ({ address, className, style }: WalletAddressProps) => {
    return (
        <div className={className} style={style}>
            {WalletHelper.getShortAddress(address)}
        </div>
    );
};
