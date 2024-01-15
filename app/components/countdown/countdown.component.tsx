"use client";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from "./countdown.module.scss";
import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";

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
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [intervalRef, setIntervalRef] = useState(null as number | null);

  const parseCountdown = (to: Date) => {
    const from = new Date();
    setDays(Math.floor(differenceInDays(to, from)));
    setHours(Math.floor(differenceInHours(to, from) % 24));
    setMinutes(Math.floor(differenceInMinutes(to, from) % 60));
    setSeconds(Math.floor(differenceInSeconds(to, from) % 60));
  };

  useEffect(() => {
    if (intervalRef) {
      clearTimeout(intervalRef);
      setIntervalRef(null);
      clearAllTimeouts();
    }
    parseCountdown(end);
    const t = setInterval(
      () => {
        parseCountdown(end);
      },
      countDownMilliseconds,
      {},
    );

    setIntervalRef(t);

    return () => {
      if (intervalRef) {
        clearTimeout(intervalRef);
        setIntervalRef(null);
      }
    };
  }, [end, countDownMilliseconds, intervalRef]);

  const clearAllTimeouts = () => {
    const noopInterval = window.setInterval(
      function () {},
      Number.MAX_SAFE_INTEGER,
    );

    for (let i = 1; i < noopInterval; i++) {
      window.clearInterval(i);
    }
  };

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
