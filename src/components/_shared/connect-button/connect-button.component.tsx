"use client";
import {
  ConnectButton as RainbowConnectButton,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { Avatar, Button, DropdownButton } from "@/components/_shared";
import { ChevronIcon } from "@/components/_icons";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import WalletHelper from "@/lib/helpers/wallet.helper";
import styles from "./connect-button.module.scss";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount } from "wagmi";
import { ButtonProps } from "@/components/_shared/button/button.component";

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
      <DropdownButton.Dropdown>
        {isConnected ? (
          // TODO: fix colors
          <div className={styles.wallet_addons}>
            <div className={styles.addon}>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {mentoBalance.symbol}
              </div>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {mentoBalance.formatted}
              </div>
            </div>
            <div className={styles.addon}>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {veMentoBalance.symbol}
              </div>
              <div className="flex flex-row items-center justify-center p-x1 font-semibold">
                {veMentoBalance.formatted}
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
              className={classNames(
                className,
                fullwidth ? "" : "flex w-auto justify-center",
              )}
              style={style}
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
