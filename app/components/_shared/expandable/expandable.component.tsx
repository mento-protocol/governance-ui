import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from './expandable.module.scss';
import classNames from "classnames";

interface ExpandableProps extends BaseComponentProps {

}

const ExpandableHeader = ({children}: BaseComponentProps) => {
    return <header className={styles.expandable__header}>
        <div>
            {children}
        </div>
        <div>

        </div>
    </header>;
}
const ExpandableBody = ({children}: BaseComponentProps) => {
    return <div className={styles.expandable__content}>{children}</div>;
}

export const Expandable = ({children, className, style}: ExpandableProps) => {
    return (
        <div className={classNames(styles.expandable, className)} style={style}>
            {children}
        </div>
    );
}

Expandable.Header = ExpandableHeader;
Expandable.Body = ExpandableBody;