"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useOutsideAlerter from "@lib/hooks/useOutsideAlerter";
import { ButtonType } from "@lib/types";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button } from "@components/_shared";
import { ChevronIcon } from "@components/_icons";
import {
  Dropdown,
  DropdownElement,
} from "@components/_shared/dropdown-button/dropdown-button.addons";
import styles from "./dropdown-button.module.scss";

interface DropdownButtonProps extends BaseComponentProps {
  theme?: ButtonType;
  title?: string;
  block?: boolean;
  avatar?: JSX.Element;
}

export const DropdownButton = ({
  theme = "primary",
  className,
  children,
  style,
  title,
  block,
  avatar,
}: DropdownButtonProps) => {
  const [dropdownPositionHorizontal, setDropdownPositionHorizontal] = useState(
    "right" as "left" | "right",
  );
  const [dropdownPositionTopOffset, setDropdownPositionTopOffset] = useState(0);
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownContentRef = useRef(null);

  useOutsideAlerter(dropdownRef, () => {
    setDropdownOpened(false);
  });

  useEffect(() => {
    const elementRect = (dropdownRef?.current as any).getBoundingClientRect();
    const elementWidth = (dropdownRef?.current as any).getBoundingClientRect()
      .width;
    if (elementRect.left - elementWidth < 0) {
      setDropdownPositionHorizontal("left");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const elementRect = (dropdownRef?.current as any).getBoundingClientRect();
      if (elementRect.top >= window.screen.height - 350) {
        const contentRect = (
          dropdownContentRef?.current as any
        ).getBoundingClientRect();
        setDropdownPositionTopOffset(contentRect.height + 10);
      } else {
        setDropdownPositionTopOffset(0);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={classNames(
        styles.wrapper,
        styles[theme],
        block && styles.block,
        dropdownOpened && styles.opened,
        className,
      )}
      style={style}
    >
      <Button
        block={block}
        theme={theme}
        className={styles.button}
        onClick={() => setDropdownOpened(!dropdownOpened)}
      >
        {!!avatar && avatar}
        {title}
        <span
          className={classNames(styles.toggle, dropdownOpened && styles.opened)}
        >
          <ChevronIcon
            width={15}
            height={10}
            useThemeColor
            direction={"down"}
          />
        </span>
      </Button>
      <div
        ref={dropdownContentRef}
        style={{
          top: !!dropdownPositionTopOffset
            ? `-${dropdownPositionTopOffset}px`
            : "",
        }}
        className={classNames(
          styles.dropdown_wrapper,
          styles[theme],
          styles[dropdownPositionHorizontal],
        )}
      >
        {children}
      </div>
    </div>
  );
};

DropdownButton.Element = DropdownElement;
DropdownButton.Dropdown = Dropdown;
