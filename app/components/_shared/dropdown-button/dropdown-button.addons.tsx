import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from "@components/_shared/dropdown-button/dropdown-button.module.scss";
import {Button} from "@components/_shared";

export const Dropdown = ({children, className, style}: BaseComponentProps) => {
    return <div className={classNames(styles.dropdown, className)} style={style}>
        {children}
    </div>
}

interface ElementProps extends BaseComponentProps {
    onClick?: () => void;
}

export const DropdownElement = ({children, className, style, onClick}: ElementProps) => {
    return <div className={classNames(styles.dropdown_element, className)} style={style}>
        <button onClick={onClick}>
            {children}
        </button>
    </div>
}