"use client";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from "./countdown.module.scss";
import { useEffect, useState } from "react";

const getTimeLeftValues = (countDown: number) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

const useCountdown = (end: Date, countDownMilliseconds: number) => {
  const countDownDate = new Date(end).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime(),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = countDownDate - new Date().getTime();
      if (timeLeft >= 0) {
        setCountDown(timeLeft);
      }
    }, countDownMilliseconds);

    return () => clearInterval(interval);
  }, [countDownDate, countDownMilliseconds]);

  return getTimeLeftValues(countDown);
};

interface CountdownComponentProps extends BaseComponentProps {
  end: Date;
  countDownMilliseconds: number;
}

export const Countdown = ({
  className,
  end,
  countDownMilliseconds,
  style,
}: CountdownComponentProps) => {
  const [days, hours, minutes, seconds] = useCountdown(
    end,
    countDownMilliseconds,
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
