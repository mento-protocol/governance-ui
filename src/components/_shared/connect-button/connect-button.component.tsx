"use client";
import {
  ConnectButton as RainbowConnectButton,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import {
  Avatar,
  Button,
  ButtonProps,
  DropdownButton,
} from "@/components/_shared";
import { ChevronIcon, DisconnectIcon, MentoIcon } from "@/components/_icons";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import WalletHelper from "@/lib/helpers/wallet.helper";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount, useDisconnect } from "wagmi";
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
  const { disconnect } = useDisconnect();

  const { mentoBalance, veMentoBalance } = useTokens();

  return (
    <DropdownButton
      theme={"clear"}
      fullwidth={fullwidth}
      title={WalletHelper.getShortAddress(account.address)}
      avatar={
        <Avatar
          className="flex h-full flex-row items-center"
          address={account.address || ""}
        />
      }
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
            <hr />
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
          {/* TODO: Need account icon */}
          <span>Account settings</span>
        </DropdownButton.Element>
        <DropdownButton.Element onClick={openChainModal}>
          <span>Chain settings</span>
        </DropdownButton.Element>
        <DropdownButton.Element
          className="*:flex *:items-center *:justify-start"
          onClick={() => disconnect()}
        >
          <DisconnectIcon />
          <span>Disconnect</span>
        </DropdownButton.Element>
      </DropdownButton.Dropdown>
    </DropdownButton>
  );
};

type ConnectButtonProps = ButtonProps;

export const ConnectButton = ({
  className,
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
                fullwidth ? "" : "flex w-auto justify-center",
                className,
              )}
            >
              {!connected ? (
                <Button theme={theme || "secondary"} onClick={openConnectModal}>
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
