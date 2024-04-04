"use client";
import {
  ConnectButton as RainbowConnectButton,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { Avatar, Button, DropdownButton } from "@/components/_shared";
import { ChevronIcon, MentoIcon } from "@/components/_icons";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import WalletHelper from "@/lib/helpers/wallet.helper";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount } from "wagmi";
import { ButtonProps } from "@/components/_shared/button/button.component";
import { cn } from "@/styles/helpers";
import NumbersService from "@/lib/helpers/numbers.service";

interface ConnectedDropdownProps extends BaseComponentProps {
  fullwidth?: boolean;
  account: {
    address: string;
    displayBalance?: string;
  };
  chain?: any;
}

export const ConnectedDropdown = ({
  fullwidth,
  account,
}: ConnectedDropdownProps) => {
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected } = useAccount();

  const { mentoBalance, veMentoBalance } = useTokens();

  return (
    <DropdownButton
      theme={"clear"}
      fullwidth={fullwidth}
      title={WalletHelper.getShortAddress(account.address)}
      avatar={<Avatar address={account.address || ""} />}
    >
      <DropdownButton.Dropdown className="border border-solid border-black bg-white text-black dark:border-white dark:bg-black dark:text-white">
        {isConnected ? (
          // TODO: fix colors
          <div className="flex w-full flex-col items-center border-b border-solid border-black dark:border-white">
            <div className="flex w-full flex-row justify-between px-x1 py-x2">
              <div className="flex flex-row items-center p-x1 font-semibold">
                <MentoIcon
                  className="mr-x1"
                  height={32}
                  width={32}
                  backgroundColor={"cyan"}
                />
                <span>{mentoBalance.symbol}</span>
              </div>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {NumbersService.parseNumericValue(mentoBalance.formatted, 1)}
              </div>
            </div>
            <div className="flex w-full flex-row justify-between px-x1 py-x2">
              <div className="flex flex-shrink flex-grow flex-row items-center p-x1 font-semibold">
                <MentoIcon
                  className="mr-x1"
                  height={32}
                  width={32}
                  backgroundColor={"blush"}
                />
                <span>{veMentoBalance.symbol}</span>
              </div>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {NumbersService.parseNumericValue(veMentoBalance.formatted, 1)}
              </div>
            </div>
          </div>
        ) : null}
        <DropdownButton.Element onClick={openAccountModal}>
          Account settings
        </DropdownButton.Element>
        <DropdownButton.Element onClick={openChainModal}>
          Chain settings
        </DropdownButton.Element>
      </DropdownButton.Dropdown>
    </DropdownButton>
  );
};

type ConnectButtonProps = ButtonProps;

export const ConnectButton = ({
  className,
  style,
  theme,
  fullwidth,
}: ConnectButtonProps) => {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        if (!mounted) return <></>;
        const connected = !!account && !!chain;

        return (
          <>
            <div
              className={cn(
                className,
                fullwidth ? "" : "flex w-auto justify-center",
              )}
              style={style}
            >
              {!connected ? (
                <Button
                  className="pb-0"
                  theme={theme || "secondary"}
                  onClick={openConnectModal}
                >
                  <div className="flex flex-row place-items-center justify-center gap-2">
                    <div>Connect wallet</div>
                    <ChevronIcon direction={"right"} />
                  </div>
                </Button>
              ) : (
                <ConnectedDropdown
                  account={account}
                  fullwidth={!!fullwidth}
                  chain={chain}
                />
              )}
            </div>
          </>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};
