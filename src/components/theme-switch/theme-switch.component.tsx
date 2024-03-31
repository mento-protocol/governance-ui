import BaseComponentProps from "@/interfaces/base-component-props.interface";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { DarkModeIcon, LightModeIcon } from "@/components/_icons";
import styles from "./theme-switch.module.scss";

enum Mode {
  LIGHT = "light",
  DARK = "dark",
}

export const ThemeSwitch = ({ className, style }: BaseComponentProps) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [defaultMode, setDefaultMode] = useState(Mode.LIGHT);

  useEffect(() => {
    const initialTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = localStorage.getItem("theme");
    if (theme) setSelectedMode(theme);
    if (initialTheme) setDefaultMode(initialTheme ? Mode.DARK : Mode.LIGHT);
  }, []);

  useEffect(() => {
    if (selectedMode) localStorage.setItem("theme", selectedMode);
    if (selectedMode || defaultMode)
      document.body.className = selectedMode || defaultMode;
  }, [selectedMode, defaultMode]);

  const onToggleSwitch = () => {
    setSelectedMode(selectedMode === Mode.DARK ? Mode.LIGHT : Mode.DARK);
  };

  return (
    <button
      onClick={onToggleSwitch}
      className={classNames(
        styles.switch,
        styles[`switch__${selectedMode || defaultMode}`],
        className,
      )}
      style={style}
    >
      <div className={styles.switch__mode}>
        <div
          className={classNames(
            styles.circle,
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
