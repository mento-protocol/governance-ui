"use client";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from './expandable.module.scss';
import classNames from "classnames";
import {ChevronIcon} from "@components/_icons";
import {useState} from "react";

interface ExpandableProps extends BaseComponentProps {
    header: React.ReactNode | string;
}

export const Expandable = ({children, className, style, header}: ExpandableProps) => {

    const [opened, setOpened] = useState(false)

    return (
        <div className={classNames(styles.expandable, className)} style={style}>
            <header className={styles.expandable__header}>
                <div>
                    {header}
                </div>
                <div className={classNames(styles.toggle, opened && styles.opened)} onClick={() => setOpened(!opened)}>
                    <ChevronIcon direction="down" width={25} height={20} />
                </div>
            </header>
            <div className={classNames(styles.expandable__body, opened && styles.opened)}>
                {children}
            </div>
        </div>
    );
}