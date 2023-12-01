import styles from './tabs.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";

interface TabProps extends BaseComponentProps {

}

export const Tab = ({className, style, children}: TabProps) => {
    return <div className={classNames(className)} style={style}>
        {children}
    </div>
}