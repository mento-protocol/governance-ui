"use client";
import { useEffect, useState } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@mento-protocol/ui-toolkit";

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
      className={cn(
        "mt-x3 flex items-center justify-center gap-6 md:mt-0 md:justify-end ",
        className,
      )}
      style={style}
    >
      <div
        className={cn(
          "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          "mr-x1 text-primary",
        )}
      >
        <CountdownNumber>{days}</CountdownNumber>
        <CountdownLabel>days</CountdownLabel>
      </div>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          )}
        >
          <CountdownNumber>{hours}</CountdownNumber>
          <CountdownLabel>hours</CountdownLabel>
        </div>
        <TimerSeparator />
        <div
          className={cn(
            "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          )}
        >
          <CountdownNumber>{minutes}</CountdownNumber>
          <CountdownLabel>minutes</CountdownLabel>
        </div>
        <TimerSeparator />
        <div
          className={cn(
            "flex min-w-x11 flex-col items-center justify-center gap-x2 md:min-w-x16 md:gap-x3",
          )}
        >
          <CountdownNumber>{seconds}</CountdownNumber>
          <CountdownLabel>seconds</CountdownLabel>
        </div>
      </div>
    </div>
  );
};

const TimerSeparator = () => {
  return (
    <span className="flex h-auto p-0 text-[22px]/[0.75] md:text-[32px]/[0.75]">
      :
    </span>
  );
};

const CountdownNumber = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:text-x6 relative w-full text-center text-[22px]/[0.75] font-medium md:text-[32px]/none">
      {children}
    </div>
  );
};

const CountdownLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:text-x4  w-full text-center text-[18px]/none  dark:text-white">
      {children}
    </div>
  );
};
