"use client";
import styles from './header.module.scss';
import classNames from "classnames";
import {ChevronIcon, MentoLogoIcon} from "../../_icons";
import Link from "next/link";
import {useContext, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import {Button, ConnectButton, DropdownButton} from "@components/_shared";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import WalletHelper from "@/app/helpers/wallet.helper";

interface HeaderProps extends BaseComponentProps {
}

export const Header = ({className, style}: HeaderProps) => {
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => {
        setMenuOpened('')
    });

    const [menuOpened, setMenuOpened] = useState('');
    const [drawerOpened, setDrawerOpened] = useState(false);

    const toggleMenu = (event: any, name: string) => {
        event.stopPropagation();
        setMenuOpened(name === menuOpened ? '' : name);
    }

    return <header className={classNames(styles.header, 'pa-6', className)} style={style}
                   onClick={() => setMenuOpened('')}>
        <div className={classNames(styles.header__inner, drawerOpened && styles.opened)}>
            <Link href={'/'}>
                <MentoLogoIcon className="hidden md:block" useThemeColor/>
            </Link>
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
            <ConnectButton block/>

        </div>
        <div className={classNames(styles.mobile_inner, 'flex p-6 z-50 md:hidden')}>
            <Link href={'/'}>
                <MentoLogoIcon useThemeColor/>
            </Link>
            <Button theme="secondary" onClick={() => setDrawerOpened(!drawerOpened)}>
                menu
            </Button>
        </div>

    </header>
}
