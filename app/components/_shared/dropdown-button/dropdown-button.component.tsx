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
    block?: boolean;
}

export const DropdownButton = ({type = 'primary', className, children, style, title, block}: DropdownButtonProps) => {
    const [dropdownPositionHorizontal, setDropdownPositionHorizontal] = useState('right' as 'left' | 'right');
    const [dropdownPositionTopOffset, setDropdownPositionTopOffset] = useState(0);
    const [dropdownOpened, setDropdownOpened] = useState(false)

    const dropdownRef = useRef(null);
    const dropdownContentRef = useRef(null);
    useOutsideAlerter(dropdownRef, () => {
        setDropdownOpened(false)
    });

    useEffect(() => {
        const elementRect = (dropdownRef?.current as any).getBoundingClientRect();
        const elementWidth = (dropdownRef?.current as any).getBoundingClientRect().width;
        if (elementRect.left - elementWidth < 0) {
            setDropdownPositionHorizontal('left');
        }
    }, []);

    useEffect(() => {
        const elementRect = (dropdownRef?.current as any).getBoundingClientRect();
        console.log(elementRect);
        if (elementRect.bottom < 250) {

            const contentRect = (dropdownContentRef?.current as any).getBoundingClientRect();

            setDropdownPositionTopOffset(contentRect.height + 10);
        } else {
            setDropdownPositionTopOffset(0);
        }

    }, []);

    return (
        <div ref={dropdownRef} className={classNames(styles.wrapper, block && styles.block, dropdownOpened && styles.opened, className)} style={style}>
            <Button block={block} type={type} className={styles.button} onClick={() => setDropdownOpened(!dropdownOpened)}>
                {title}
                <span className={classNames(styles.toggle, dropdownOpened && styles.opened)}>
                    <ChevronIcon width={15} height={10} useThemeColor direction={'down'}/>
                </span>
            </Button>
            <div ref={dropdownContentRef}
                 style={{top: !!dropdownPositionTopOffset ? `-${dropdownPositionTopOffset}px` : ''}}
                 className={classNames(styles.dropdown_wrapper, styles[type], styles[dropdownPositionHorizontal])}>
                {children}
            </div>
        </div>
    )
}

DropdownButton.Element = DropdownElement;
DropdownButton.Dropdown = Dropdown;