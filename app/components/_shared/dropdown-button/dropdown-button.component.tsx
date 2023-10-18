"use client";
import styles from './dropdown-button.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {ButtonType} from "@/app/types";
import {Button} from "@components/_shared";
import {useEffect, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import classNames from "classnames";
import {ChevronIcon} from "@components/_icons";
import {Dropdown, DropdownElement} from "@components/_shared/dropdown-button/dropdown-button.addons";

interface DropdownButtonProps extends BaseComponentProps {
    type?: ButtonType;
    title?: string;
}

export const DropdownButton = ({type = 'primary', className, children, style, title}: DropdownButtonProps) => {
    const [dropdownPosition, setDropdownPosition] = useState('right' as 'left' | 'right');
    const [dropdownOpened, setDropdownOpened] = useState(false)

    const dropdownRef = useRef(null);
    useOutsideAlerter(dropdownRef, () => {
        setDropdownOpened(false)
    });

    useEffect(() => {
        const elementRect = (dropdownRef?.current as any).getBoundingClientRect();
        const elementWidth = (dropdownRef?.current as any).getBoundingClientRect().width;
        if (elementRect.left - elementWidth < 0) {
            setDropdownPosition('left');
        }
    }, []);


    return (
        <div ref={dropdownRef} className={classNames(styles.wrapper, dropdownOpened && styles.opened, className)} style={style}>
            <Button type={type} className={styles.button} onClick={() => setDropdownOpened(!dropdownOpened)}>
                {title}
                <span className={classNames(styles.toggle, dropdownOpened && styles.opened)}>
                    <ChevronIcon width={25} height={20} useThemeColor direction={'down'}/>
                </span>
            </Button>
            <div className={classNames(styles.dropdown_wrapper, styles[type], styles[dropdownPosition])}>
                {children}
            </div>
        </div>
    )
}

DropdownButton.Element = DropdownElement;
DropdownButton.Dropdown = Dropdown;