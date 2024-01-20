import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from "./progress-bar.module.scss";
import classNames from "classnames";
import { useMemo } from "react";
import NumbersService from "@/app/helpers/numbers.service";

interface ProgressBarProps extends BaseComponentProps {
  current: number;
  max: number;
  type?: "success" | "info" | "warning" | "danger";
  color?: string;
  valueFormat?: "localised" | "alphabetic";
}

export interface MultiProgressBarValue {
  value: number;
  type?: "success" | "info" | "warning" | "danger";
}

interface MultiProgressBarProps extends BaseComponentProps {
  values: MultiProgressBarValue[];
  max: number;
  color?: string;
}

export const ProgressBar = ({
  className,
  style,
  current,
  max,
  type,
  color,
  valueFormat,
}: ProgressBarProps) => {
  const progress = Math.floor((current / max) * 100);

  const parsedValue = useMemo(() => {
    if (!valueFormat) {
      return current.toString();
    }
    if (valueFormat === "localised") {
      return current.toLocaleString();
    } else if (valueFormat === "alphabetic") {
      return NumbersService.parseNumericValue(current);
    }
  }, [current, valueFormat]);

  return (
    <div
      className={classNames(styles.progress_bar_wrapper, className)}
      style={style}
    >
      <div>{parsedValue}</div>
      <div className={styles.progress_bar}>
        <div
          className={classNames(styles.value, styles[type || ""])}
          style={{ width: `${progress}%`, color }}
        ></div>
      </div>
    </div>
  );
};

export const MultiProgressBar = ({
  className,
  values,
  max,
  color,
  style,
}: MultiProgressBarProps) => {
  return (
    <div
      className={classNames(styles.progress_bar_wrapper, className)}
      style={style}
    >
      <div className={styles.progress_bar}>
        {values.map((value, index) => {
          const progress = Math.floor((value.value / max) * 100);
          return (
            <div
              key={index}
              className={classNames(styles.value, styles[value.type || ""])}
              style={{ width: `${progress}%`, color, zIndex: 10 - index }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
