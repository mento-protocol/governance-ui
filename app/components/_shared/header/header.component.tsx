"use client";
import styles from './header.module.scss';
import classNames from "classnames";
import {ChevronIcon, MentoLogoIcon} from "../../_icons";
import Link from "next/link";
import {useContext, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import {Button, DropdownButton} from "@components/_shared";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {ConnectButton, useConnectModal} from "@rainbow-me/rainbowkit";

interface HeaderProps extends BaseComponentProps {
}

export const Header = ({className, style}: HeaderProps) => {
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => {
        setMenuOpened('')
    });
    const status = useConnectModal();

    const [menuOpened, setMenuOpened] = useState('');
    const [drawerOpened, setDrawerOpened] = useState(false);

    const toggleMenu = (event: any, name: string) => {
        event.stopPropagation();
        setMenuOpened(name === menuOpened ? '' : name);
    }

    return <header className={classNames(styles.header, 'pa-6', className)} style={style}
                   onClick={() => setMenuOpened('')}>
        <div className={classNames(styles.header__inner, drawerOpened && styles.opened)}>
            <div>
                <MentoLogoIcon className="hidden md:block" useThemeColor/>
            </div>
            <ul ref={menuRef} className={styles.header__nav}>
                <li className={classNames(styles.item, styles.dropdown, menuOpened === 'developers' && styles.opened)}>
                    <p onClick={e => toggleMenu(e, 'developers')}>
                        <span>Developers</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon useThemeColor
                                                                                  direction={'down'}/></span>
                    </p>
                    <ul>
                        <li className={classNames(styles.item)}>
                            <Link href="#">
                                <p>Docs</p>
                            </Link>
                        </li>
                        <li className={classNames(styles.item)}>
                            <Link href="#">
                                <p>Github</p>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className={classNames(styles.item, styles.dropdown, menuOpened === 'community' && styles.opened)}>
                    <p onClick={e => toggleMenu(e, 'community')}>
                        <span>Community</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon useThemeColor
                                                                                  direction={'down'}/></span>

                    </p>
                    <ul>
                        <li className={classNames(styles.item)}>
                            <Link href="#">
                                <p>Forum</p>
                            </Link>
                        </li>
                        <li className={classNames(styles.item)}>
                            <Link href="#">
                                <p>Discord</p>
                            </Link>
                        </li>
                        <li className={classNames(styles.item)}>
                            <Link href="#">
                                <p>Twitter</p>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className={classNames(styles.item)}>
                    <Link href="#">
                        <p>Team</p>
                    </Link>
                </li>
            </ul>
            <ConnectButton.Custom>
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
                            <div className={classNames(connected && styles.header__side)}>
                                {!connected ? <Button block theme={'secondary'} onClick={openConnectModal}>
                                    <div className="flex flex-row justify-center place-items-center gap-2">
                                        <div>Connect wallet</div>
                                        <ChevronIcon direction={'right'}/>
                                    </div>
                                </Button> : <DropdownButton type={'clear'}
                                                            block
                                                            title={`${account.address.substring(0, 6)}...${account.address.substring(account.address.length - 4)}`}>
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
            </ConnectButton.Custom>

        </div>
        <div className={classNames(styles.mobile_inner, 'flex p-6 z-50 md:hidden')}>
            <MentoLogoIcon useThemeColor/>
            <Button theme="secondary" onClick={() => setDrawerOpened(!drawerOpened)}>
                menu
            </Button>
        </div>

    </header>
}
