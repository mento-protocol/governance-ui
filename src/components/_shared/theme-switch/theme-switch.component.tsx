"use client";
import { DarkModeIcon, LightModeIcon } from "@/components/_icons";
import { useTheme } from "next-themes";
import { cn } from "@mento-protocol/ui-toolkit";

const enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeSwitch = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  const onToggleSwitch = () => {
    setTheme(theme === Mode.DARK ? Mode.LIGHT : Mode.DARK);
  };

  return (
    <button
      onClick={onToggleSwitch}
      className={cn(
        "relative flex h-[24px] w-[44px] items-center justify-between rounded-[32px] px-x1 py-[3px]",
        theme === Mode.LIGHT ? "border border-black bg-white" : "bg-secondary",
      )}
    >
      <div className="flex w-full items-center justify-between gap-x1">
        <div
          className={cn(
            "ease duration-[400ms] absolute h-[18px] w-[18px] rounded-[9px] bg-black transition-all",
            theme === Mode.LIGHT ? "left-[3px]" : "left-[21px]",
          )}
        />
        <div className="flex w-full justify-between">
          <LightModeIcon />
          <DarkModeIcon />
        </div>
      </div>
    </button>
  );
};
