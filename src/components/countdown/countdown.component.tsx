"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from "./countdown.module.scss";

const getTimeLeftValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const useCountdown = (endTimestamp: number, updateIntervalInMs: number) => {
  const [countDown, setCountDown] = useState(endTimestamp - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = countDown - updateIntervalInMs;
      if (timeLeft >= 0) {
        setCountDown(timeLeft);
      }
    }, updateIntervalInMs);

    return () => clearInterval(interval);
  }, [countDown, updateIntervalInMs]);

  return getTimeLeftValues(countDown);
};

interface CountdownComponentProps extends BaseComponentProps {
  endTimestamp: number;
  updateIntervalInMs: number;
}

export const Countdown = ({
  className,
  endTimestamp,
  updateIntervalInMs,
  style,
}: CountdownComponentProps) => {
  const [days, hours, minutes, seconds] = useCountdown(
    endTimestamp,
    updateIntervalInMs,
  );

  return (
    <div className={classNames(styles.countdown, className)} style={style}>
      <div className={classNames(styles.item, styles.day)}>
        <div className={styles.value}>{days}</div>
        <div className={styles.label}>days</div>
      </div>
      <div className={classNames(styles.item, styles.time)}>
        <div className={styles.value}>{hours}</div>
        <div className={styles.label}>hours</div>
      </div>
      <div className={classNames(styles.item, styles.time)}>
        <div className={styles.value}>{minutes}</div>
        <div className={styles.label}>minutes</div>
      </div>
      <div className={classNames(styles.item, styles.time)}>
        <div className={styles.value}>{seconds}</div>
        <div className={styles.label}>seconds</div>
      </div>
    </div>
  );
};
