"use client";
import {
  ConnectButton as RainbowConnectButton,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import classNames from "classnames";
import { formatUnits } from "viem";
import { Avatar, Button, DropdownButton } from "@components/_shared";
import { ChevronIcon } from "@components/_icons";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import WalletHelper from "@lib/helpers/wallet.helper";
import { ButtonType } from "@lib/types";
import styles from "./connect-button.module.scss";
import useTokens from "@lib/contracts/useTokens";
import { useAccount } from "wagmi";

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
  const { isConnected } = useAccount();

  const { mentoBalance, veMentoBalance } = useTokens();

  return (
    <DropdownButton
      theme={"clear"}
      block={block}
      title={WalletHelper.getShortAddress(account.address)}
      avatar={<Avatar address={account.address || ""} />}
    >
      <DropdownButton.Dropdown>
        {isConnected ? (
          <div className={styles.wallet_addons}>
            <div className={styles.addon}>
              <div className={styles.addon__title}>{mentoBalance.symbol}</div>
              <div className={styles.addon__value}>
                {formatUnits(mentoBalance.value, mentoBalance.decimal)}
              </div>
            </div>
            <div className={styles.addon}>
              <div className={styles.addon__title}>{veMentoBalance.symbol}</div>
              <div className={styles.addon__value}>
                {formatUnits(veMentoBalance.value, veMentoBalance.decimal)}
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
            <div
              className={classNames(className, block ? "" : styles.container)}
              style={style}
            >
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
