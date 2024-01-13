"use client";
import styles from "./connect-button.module.scss";
import { Avatar, Button, DropdownButton } from "@components/_shared";
import { ChevronIcon } from "@components/_icons";
import WalletHelper from "@/app/helpers/wallet.helper";
import {
  ConnectButton as RainbowConnectButton,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { ButtonType } from "@/app/types";
import { useUserStore } from "@/app/store";
import { useEffect } from "react";

interface ConnectedDropdownProps extends BaseComponentProps {
  block?: boolean;
  account: {
    address: string;
    displayBalance?: string;
  };
  chain?: any;
}

export const ConnectedDropdown = ({
  block,
  account,
  chain,
}: ConnectedDropdownProps) => {
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();

  const {
    initWallet,
    disconnectWallet,
    isFetching,
    isInitialized,
    balanceMENTO,
  } = useUserStore();

  useEffect(() => {
    const connected = !!account && !!chain;
    if (connected && !isInitialized && !isFetching) {
      initWallet(account.address);
    }
    if (!connected && !isFetching && isInitialized) {
      disconnectWallet();
    }
  }, [account, chain, isFetching, isInitialized, disconnectWallet, initWallet]);

  return (
    <DropdownButton
      theme={"clear"}
      block={block}
      title={WalletHelper.getShortAddress(account.address)}
      avatar={<Avatar address={account.address || ""} />}
    >
      <DropdownButton.Dropdown>
        <div className={styles.wallet_addons}>
          <div className={styles.addon}>
            <div className={styles.addon__title}>
              {account.displayBalance?.split(" ")[1]}
            </div>
            <div className={styles.addon__value}>
              {account.displayBalance?.split(" ")[0]}
            </div>
          </div>
          <div className={styles.addon}>
            <div className={styles.addon__title}>MENTO</div>
            <div className={styles.addon__value}>{balanceMENTO}</div>
          </div>
        </div>
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

interface ConnectButtonProps extends BaseComponentProps {
  theme?: ButtonType;
  block?: boolean;
}

export const ConnectButton = ({
  className,
  style,
  theme,
  block,
}: ConnectButtonProps) => {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        if (!mounted) return <></>;
        const connected = !!account && !!chain;

        return (
          <>
            <div className={className} style={style}>
              {!connected ? (
                <Button theme={theme || "secondary"} onClick={openConnectModal}>
                  <div className="flex flex-row justify-center place-items-center gap-2">
                    <div>Connect wallet</div>
                    <ChevronIcon direction={"right"} />
                  </div>
                </Button>
              ) : (
                <ConnectedDropdown
                  account={account}
                  block={block}
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
