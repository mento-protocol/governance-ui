"use client";
import styles from './header.module.scss';
import classNames from "classnames";
import {ChevronIcon, MentoLogoIcon} from "../../_icons";
import Link from "next/link";
import {useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import {Button} from "@components/_shared";
import BaseComponentProps from "@interfaces/base-component-props.interface";

interface HeaderProps extends BaseComponentProps {}

export const Header = ({className, style}: HeaderProps) => {

    const [menuOpened, setMenuOpened] = useState('');
    const menuRef = useRef(null);
    useOutsideAlerter(menuRef, () => {setMenuOpened('')});

    const toggleMenu = (name: string) => {
        setMenuOpened(name === menuOpened ? '' : name);
    }

    return <header className={classNames(styles.header, className)} style={style}>
        <div className={classNames(styles.header__inner)}>
            <MentoLogoIcon/>
            <ul className={styles.header__nav}>
                <li className={classNames(styles.item, styles.dropdown, menuOpened === 'developers' && styles.opened)}>
                    <p onClick={() => toggleMenu('developers')}>
                        <span>Developers</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon direction={'down'}/></span>
                    </p>
                    <ul ref={menuRef}>
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
                    <p onClick={() => toggleMenu('community')}>
                        <span>Community</span>
                        <span className={styles.dropdown__indicator}><ChevronIcon direction={'down'}/></span>

                    </p>
                    <ul ref={menuRef}>
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
            <Button type={'secondary'} onClick={() => {}}>Connect wallet</Button>
        </div>
    </header>
}
