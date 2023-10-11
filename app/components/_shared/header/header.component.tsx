"use client";
import styles from './header.module.scss';
import classNames from "classnames";
import {ChevronIcon, MentoLogoIcon} from "../../_icons";
import Link from "next/link";
import {useContext, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import {Button} from "@components/_shared";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {useWalletContext} from "@/app/providers/wallet.provider";

interface HeaderProps extends BaseComponentProps {
}

export const Header = ({className, style}: HeaderProps) => {
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => {
        setMenuOpened('')
    });

    const [menuOpened, setMenuOpened] = useState('');
    const {wallet, setWallet} = useWalletContext();

    const toggleMenu = (name: string) => {
        setMenuOpened(name === menuOpened ? '' : name);
    }

    return <header className={classNames(styles.header, className)} style={style}>
        <div className={classNames(styles.header__inner)}>
            <div className={classNames(!wallet?.length && styles.header__side)}>
                <MentoLogoIcon useThemeColor/>
            </div>
            <ul className={styles.header__nav}>
                <li ref={menuRef}
                    className={classNames(styles.item, styles.dropdown, menuOpened === 'developers' && styles.opened)}>
                    <p onClick={() => toggleMenu('developers')}>
                        <span>Developers</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon direction={'down'}/></span>
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
                <li ref={menuRef}
                    className={classNames(styles.item, styles.dropdown, menuOpened === 'community' && styles.opened)}>
                    <p onClick={() => toggleMenu('community')}>
                        <span>Community</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon direction={'down'}/></span>

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
            {!!wallet?.length && <div className={styles.wallet_addons}>
                <div className={styles.inner}>
                    <div className={styles.addon}>
                        <div className={styles.addon__value}>
                            80000
                        </div>
                        <div className={styles.addon__title}>
                            MNTO
                        </div>
                    </div>
                    <div className={styles.addon}>
                        <div className={styles.addon__value}>
                            40000
                        </div>
                        <div className={styles.addon__title}>
                            veMNTO
                        </div>
                    </div>
                </div>
            </div>}
            <div className={classNames(!wallet?.length && styles.header__side)}>
                {!wallet?.length ? <Button type={'secondary'} onClick={() => {
                    setWallet('0x1234567890');
                }}>
                    <div className="flex flex-row justify-center place-items-center gap-2">
                        <div>Connect wallet</div>
                        <ChevronIcon direction={'right'}/>
                    </div>
                </Button> : <Button type={'clear'} onClick={() => {
                    setWallet('')
                }}>
                    <div className="flex flex-row justify-center place-items-center gap-2">
                        <div><code>{wallet.substring(0, 6)}...{wallet.substring(wallet.length - 4)}</code></div>
                    </div>
                </Button>}
            </div>
        </div>
    </header>
}
