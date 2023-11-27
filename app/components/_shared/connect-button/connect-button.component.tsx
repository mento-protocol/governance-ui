"use client";
import styles from './connect-button.module.scss';
import {Button, DropdownButton} from "@components/_shared";
import {ChevronIcon} from "@components/_icons";
import WalletHelper from "@/app/helpers/wallet.helper";
import {ConnectButton as RainbowConnectButton, useConnectModal} from "@rainbow-me/rainbowkit";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {ReactNode} from "react";
import {ButtonType} from "@/app/types";

interface ConnectButtonProps extends BaseComponentProps {
    theme?: ButtonType;
    block?: boolean;
}
export const ConnectButton = ({children, className, style, theme, block}: ConnectButtonProps) => {
    return <RainbowConnectButton.Custom>
        {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              mounted
          }) => {
            if (!mounted) return <></>;
            const connected = !!account && !!chain;
            return (
                <>
                    <div className={className} style={style}>
                        {!connected ? <Button theme={theme || 'secondary'} onClick={openConnectModal}>
                            <div className="flex flex-row justify-center place-items-center gap-2">
                                <div>Connect wallet</div>
                                <ChevronIcon direction={'right'}/>
                            </div>
                        </Button> : children || <DropdownButton theme={'clear'}
                                                    block={block}
                                                    title={WalletHelper.getShortAddress(account.address)}>
                            <DropdownButton.Dropdown>
                                <div className={styles.wallet_addons}>
                                    <div className={styles.addon}>
                                        <div className={styles.addon__title}>
                                            {account.displayBalance?.split(' ')[1]}
                                        </div>
                                        <div className={styles.addon__value}>
                                            {account.displayBalance?.split(' ')[0]}
                                        </div>
                                    </div>
                                </div>
                                <DropdownButton.Element onClick={openAccountModal}>
                                    Account settings
                                </DropdownButton.Element>
                                <DropdownButton.Element onClick={openChainModal}>
                                    Chain settings
                                </DropdownButton.Element>
                            </DropdownButton.Dropdown>
                        </DropdownButton>}
                    </div>
                </>
            );
        }}
    </RainbowConnectButton.Custom>
}