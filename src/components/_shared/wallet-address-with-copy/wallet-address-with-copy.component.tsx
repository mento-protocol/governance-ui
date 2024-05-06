import CopyToClipboard from "react-copy-to-clipboard";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { WalletAddress } from "@/components/index";
import { CopyIcon } from "@/components/_icons/copy.icon";
import { cn } from "@/styles/helpers";
import { toast } from "sonner";

interface WalletAddressWithCopyProps extends BaseComponentProps {
  address: string;
  remaining?: number;
}

export const WalletAddressWithCopy = ({
  className,
  address,
  remaining,
}: WalletAddressWithCopyProps) => {
  const onCopy = async () => {
    toast.success("Address copied to clipboard", {
      unstyled: true,
      duration: 2000,
      classNames: {
        toast:
          "border font-fg border-primary-dark flex items-center justify-center bg-white text-black rounded-lg shadow-md transition-all duration-300 py-[16px] px-[20px] gap-4",
      },
    });
  };
  return (
    <div className={cn("flex items-center gap-x2", className)}>
      <WalletAddress address={address} remaining={remaining} />
      <CopyToClipboard onCopy={onCopy} text={address}>
        <div className="cursor-pointer">
          <CopyIcon />
        </div>
      </CopyToClipboard>
    </div>
  );
};
