import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from './divider.module.scss';

export const Divider = ({className, style}: BaseComponentProps) => {
    return <div className={classNames(styles.divider, className)} style={style} />;
}