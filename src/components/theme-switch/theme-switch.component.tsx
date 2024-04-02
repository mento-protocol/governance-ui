import BaseComponentProps from "@/interfaces/base-component-props.interface";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "@/components/_icons";
import { LocalStorageKeys, useLocalStorage } from "@/lib/hooks/useStorage";

const enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeSwitch = ({ className, style }: BaseComponentProps) => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const { getItem, setItem } = useLocalStorage(
    LocalStorageKeys.DARK_MODE_TOGGLE,
  );

  useEffect(() => {
    const initialTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = getItem("theme");

    if (theme) {
      setSelectedMode(theme as Mode);
    } else {
      setSelectedMode(initialTheme ? Mode.DARK : Mode.LIGHT);
    }
  }, [getItem]);

  useEffect(() => {
    if (selectedMode) {
      setItem("theme", selectedMode);
      document.body.className = selectedMode;
    }
  }, [selectedMode, setItem]);

  const onToggleSwitch = () => {
    setSelectedMode(selectedMode === Mode.DARK ? Mode.LIGHT : Mode.DARK);
  };

  return (
    <button
      onClick={onToggleSwitch}
      className={classNames(
        "relative flex h-[24px] w-[44px] items-center justify-between rounded-[32px] px-x1 py-[3px]",
        selectedMode === Mode.LIGHT ? "bg-white" : "bg-secondary",
        selectedMode === className,
      )}
      style={style}
    >
      <div className="flex w-full items-center justify-between gap-x1">
        <div
          className={classNames(
            "ease absolute h-[18px] w-[18px] rounded-[9px] bg-black transition-all duration-[400ms]",
            // TODO: refactor to use dynamic percentage widths
            selectedMode === Mode.LIGHT ? "left-[3px]" : "left-[21px]",
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
