import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from "./step-counter.module.scss";

interface StepCounterProps extends BaseComponentProps {}
export const StepCounter = ({
  children,
  className,
  style,
}: StepCounterProps) => {
  return (
    <div className={classNames(styles.counter, className)} style={style}>
      {children}
    </div>
  );
};
