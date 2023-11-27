import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from "./step-counter.module.scss";

interface StepCounterProps extends BaseComponentProps {
    isCard?: boolean;
}
export const StepCounter = ({children, className, style, isCard}: StepCounterProps) => {
    return <div className={classNames(styles.counter, isCard && styles.isCard, className)} style={style}>
        {children}
    </div>
}