import classNames from "classnames";
import styles from './badge.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {BadgeType} from "@/app/types";

interface BadgeProps extends BaseComponentProps {
    children: React.ReactNode;
    type: BadgeType;
    rounded?: boolean;
    block?: boolean;
}

export const Badge = ({children, type, block = false, rounded = false, className, style}: BadgeProps) => {
    return <div
        className={classNames(styles.badge, styles[type], block && styles.block, rounded && styles.rounded, className)}
        style={style}>
        {children}
    </div>
}