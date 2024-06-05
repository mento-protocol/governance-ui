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
import {
  ChevronIcon,
  DisconnectIcon,
  MentoIcon,
  SettingsIcon,
  ChainIcon,
} from "@/components/_icons";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import WalletHelper from "@/lib/helpers/wallet.helper";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount, useDisconnect } from "wagmi";
import { cn } from "@/styles/helpers";
import NumbersService from "@/lib/helpers/numbers.service";
import { IS_PROD } from "../../../middleware";

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
          size="small"
          className="flex h-full flex-row items-center"
          address={account.address || ""}
        />
      }
    >
      <DropdownButton.Dropdown className="border border-solid  border-black bg-white text-black dark:border-white dark:bg-black dark:text-white">
        {isConnected && (
          <div className="flex w-full flex-col items-center border-b border-solid border-black py-2 font-inter dark:border-white">
            <div className="flex w-full flex-row justify-between px-5 py-3">
              <div className="flex flex-row items-center  font-semibold">
                <MentoIcon
                  className="mr-x1"
                  height={32}
                  width={32}
                  backgroundColor={"cyan"}
                />
                <span>{mentoBalance.symbol}</span>
              </div>
              <div className="flex flex-row items-center justify-center font-semibold">
                {NumbersService.parseNumericValue(mentoBalance.formatted, 1)}
              </div>
            </div>
            <hr className="mx-auto w-[calc(100%_-_40px)] border-t-gray-light" />
            <div className="flex w-full flex-row justify-between px-5 py-x2">
              <div className="flex flex-shrink flex-grow flex-row items-center font-semibold">
                <MentoIcon
                  className="mr-x1"
                  height={32}
                  width={32}
                  backgroundColor={"blush"}
                />
                <span>{veMentoBalance.symbol}</span>
              </div>
              <div className="flex flex-row items-center justify-center font-semibold">
                {NumbersService.parseNumericValue(veMentoBalance.formatted, 1)}
              </div>
            </div>
          </div>
        )}
        <DropdownButton.Element
          className="font-inter font-medium *:flex *:items-center *:justify-start  [&_button]:pl-5"
          onClick={openAccountModal}
        >
          <SettingsIcon className="mr-3" />
          <span>Account settings</span>
        </DropdownButton.Element>
        {!IS_PROD && (
          <DropdownButton.Element
            className="font-inter font-medium *:flex *:items-center *:justify-start  [&_button]:pl-5"
            onClick={openChainModal}
          >
            <ChainIcon className="mr-3" />
            <span>Chain settings</span>
          </DropdownButton.Element>
        )}
        <hr className="mx-auto w-[calc(100%_-_40px)] border-t-gray-light" />
        <DropdownButton.Element
          className="font-inter font-medium *:flex *:items-center *:justify-start  [&_button]:pl-5"
          onClick={() => disconnect()}
        >
          <DisconnectIcon className="mr-3" />
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
