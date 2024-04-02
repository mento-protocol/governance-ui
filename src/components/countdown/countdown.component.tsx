"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
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
    <div
      className={classNames(
        "mt-x3 flex flex-row items-center justify-center gap-x1 md:mt-0 md:justify-end ",
        className,
      )}
      style={style}
    >
      <div
        className={classNames(
          "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          "mr-x1 text-primary",
        )}
      >
        <div className="text-x5 md:text-x6 relative w-full text-center font-medium leading-none">
          {days}
        </div>
        {/* TODO: --theme-foreground-color not found */}
        <div
          className={`${styles.label} text-x3 md:text-x4 w-full text-center font-normal leading-none`}
        >
          days
        </div>
      </div>
      <div
        className={classNames(
          "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          // Time selector complicated
          "[:not(:last-child)>*:first-child:after]:content-[':'] [:not(:last-child)>*:first-child:after]:absolute [:not(:last-child)>*:first-child:after]:top-0 [:not(:last-child)>*:first-child:after]:leading-none [:not(:last-child)>*:first-child:after]:font-medium [:not(:last-child)>*:first-child:after]:-right-x1 [:not(:last-child)>*:first-child:after]:text-[32px]",
        )}
      >
        <div className="text-x5 md:text-x6 relative w-full text-center font-medium leading-none">
          {hours}
        </div>
        <div
          className={`${styles.label} text-x3 md:text-x4 w-full text-center font-normal leading-none`}
        >
          hours
        </div>
      </div>
      <div
        className={classNames(
          "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          // Time selector complicated
          "[:not(:last-child)>*:first-child:after]:content-[':'] [:not(:last-child)>*:first-child:after]:absolute [:not(:last-child)>*:first-child:after]:top-0 [:not(:last-child)>*:first-child:after]:leading-none [:not(:last-child)>*:first-child:after]:font-medium [:not(:last-child)>*:first-child:after]:-right-x1 [:not(:last-child)>*:first-child:after]:text-[32px]",
        )}
      >
        <div className="text-x5 md:text-x6 relative w-full text-center font-medium leading-none">
          {minutes}
        </div>
        <div
          className={`${styles.label} text-x3 md:text-x4 w-full text-center font-normal leading-none`}
        >
          minutes
        </div>
      </div>
      <div
        className={classNames(
          "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          // Time selector complicated
          "[:not(:last-child)>*:first-child:after]:content-[':'] [:not(:last-child)>*:first-child:after]:absolute [:not(:last-child)>*:first-child:after]:top-0 [:not(:last-child)>*:first-child:after]:leading-none [:not(:last-child)>*:first-child:after]:font-medium [:not(:last-child)>*:first-child:after]:-right-x1 [:not(:last-child)>*:first-child:after]:text-[32px]",
        )}
      >
        <div className="text-x5 md:text-x6 relative w-full text-center font-medium leading-none">
          {seconds}
        </div>
        <div
          className={`${styles.label} text-x3 md:text-x4 w-full text-center font-normal leading-none`}
        >
          seconds
        </div>
      </div>
    </div>
  );
};
