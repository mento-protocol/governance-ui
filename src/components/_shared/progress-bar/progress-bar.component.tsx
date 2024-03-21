import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import classNames from "classnames";
import { useMemo } from "react";
import styles from "./progress-bar.module.scss";
import NumbersService from "@/lib/helpers/numbers.service";

type Type = "success" | "info" | "warning" | "danger";

type ProgressStyle = {
  borderRadius?: number;
  border?: string;
  backgroundColor?: string;
};
interface ProgressBarProps extends BaseComponentProps {
  current: number;
  max: number;
  type?: Type;
  color?: string;
  valueFormat?: "localised" | "alphabetic";
}

export interface MultiProgressBarValue {
  value: number;
  type?: Type;
}

interface MultiProgressBarProps extends BaseComponentProps {
  values: MultiProgressBarValue[];
  max: number;
  color?: string;
}

const barColor = (type: Type) => {
  switch (type) {
    case "success":
      return "#D2FCBD";
    case "danger":
      return "#FF848A";
    default:
      return "#D2FCBD";
  }
};

export const ProgressBar = ({
  className,
  style,
  current = 0,
  max,
  type,
  color,
  valueFormat,
}: ProgressBarProps) => {
  const progress: number = useMemo(() => {
    return max ? Math.floor((current / max) * 100) : 0;
  }, [max, current]);

  const barColorString = type ? barColor(type) : "";

  const progressStyles: ProgressStyle = useMemo(() => {
    if (progress < 3) {
      return {
        border: "none",
        backgroundColor: "transparent",
      };
    } else if (progress < 6) {
      return {
        borderRadius: 0,
        backgroundColor: "transparent",
      };
    } else if (progress === 100) {
      return {
        border: "none",
        backgroundColor: barColorString,
      };
    } else {
      return {
        backgroundColor: barColorString,
      };
    }
  }, [progress, barColorString]);

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
      <div
        className={styles.progress_bar}
        style={{
          background:
            progress < 6
              ? `linear-gradient(to right, ${barColorString} ${progress}%, white ${progress}%)`
              : "transparent",
        }}
      >
        <div
          className={classNames(styles.value, styles[type || ""])}
          style={{
            width: `${progress}%`,
            color,
            ...progressStyles,
          }}
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
              style={{
                width: `${progress}%`,
                color,
                zIndex: 10 - index,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
