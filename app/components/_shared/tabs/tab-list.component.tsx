import styles from './tabs.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {Tab} from "@components/_shared";
import {Children, ReactNode, useState} from "react";

export interface TabListProps extends BaseComponentProps {
    tabs: string[];
}

export const TabList = ({className, style, children, tabs}: TabListProps) => {

    const [selectedTab, setSelectedTab] = useState(0)

    return <div className={classNames(styles.tabView, className)} style={style}>
        <div className={styles.header}>
            {tabs.map((tab, index) => <button key={index} className={classNames(index === selectedTab && styles.active)} onClick={() => setSelectedTab(index)}>
                {tab}
            </button>)}
        </div>
        <div className={classNames(styles.list)}>
            {Children.toArray(children).map((child, index) =>
                <div key={index}
                     className={classNames(styles.list__item, index !== selectedTab && styles.hidden)}
                     style={{transform: `translate(-${selectedTab * 100}%)`}}>
                    {child}
                </div>)}
        </div>
    </div>
}