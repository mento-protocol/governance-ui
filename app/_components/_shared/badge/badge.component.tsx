import classNames from "classnames";
import styles from './badge.module.scss';

type BadgeType = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info';

interface BadgeProps {
    children: React.ReactNode;
    type: BadgeType;
    rounded?: boolean;
    block?: boolean;
}

export const Badge = ({children, type, block = false, rounded = false}: BadgeProps) => {
    return <div className={classNames(styles.badge, styles[type])}>
        {children}
    </div>
}