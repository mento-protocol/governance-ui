import BaseComponentProps from "@/interfaces/base-component-props.interface";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "@/components/_icons";
import styles from "./theme-switch.module.scss";
import { LocalStorageKeys, useLocalStorage } from "@/lib/hooks/useStorage";

enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeSwitch = ({ className, style }: BaseComponentProps) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [defaultMode, setDefaultMode] = useState(Mode.LIGHT);

  const { getItem, setItem } = useLocalStorage(
    LocalStorageKeys.DARK_MODE_TOGGLE,
  );

  useEffect(() => {
    const initialTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = getItem("theme");
    if (theme) setSelectedMode(theme);
    if (initialTheme) setDefaultMode(initialTheme ? Mode.DARK : Mode.LIGHT);
  }, [getItem]);

  useEffect(() => {
    if (selectedMode) setItem("theme", selectedMode);
    if (selectedMode || defaultMode)
      document.body.className = selectedMode || defaultMode;
  }, [selectedMode, defaultMode, setItem]);

  const onToggleSwitch = () => {
    setSelectedMode(selectedMode === Mode.DARK ? Mode.LIGHT : Mode.DARK);
  };

  return (
    <button
      onClick={onToggleSwitch}
      className={classNames(
        "relative flex h-[24px] w-[44px] items-center justify-between rounded-[32px] px-x1 py-[3px]",
        styles[`switch__${selectedMode || defaultMode}`],
        className,
      )}
      style={style}
    >
      <div className={styles.switch__mode}>
        <div
          className={classNames(
            "ease absolute h-[18px] w-[18px] rounded-[9px] bg-black transition-all duration-[400ms]",
            styles[`circle__${selectedMode || defaultMode}`],
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
