"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import useOutsideAlerter from "@/lib/hooks/useOutsideAlerter";
import { Button, ButtonProps } from "@/components/_shared";
import { ChevronIcon } from "@/components/_icons";
import { Dropdown, DropdownElement } from "./dropdown-button.addons";
import styles from "./dropdown-button.module.scss";

interface DropdownButtonProps extends ButtonProps {
  title?: string;
  avatar?: JSX.Element;
}

export const DropdownButton = ({
  theme = "primary",
  className,
  children,
  style,
  title,
  fullwidth,
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
        styles[`${theme}`],
        fullwidth && styles.block,
        dropdownOpened && styles.opened,
        className,
      )}
      style={style}
    >
      <Button
        fullwidth={fullwidth}
        theme={theme}
        className={styles.button}
        onClick={() => setDropdownOpened(!dropdownOpened)}
      >
        {!!avatar && avatar}
        {title}
        <span
          className={classNames(styles.toggle, dropdownOpened && styles.opened)}
        >
          <ChevronIcon width={15} height={10} direction={"down"} />
        </span>
      </Button>
      <div
        ref={dropdownContentRef}
        style={{
          top: dropdownPositionTopOffset
            ? `-${dropdownPositionTopOffset}px`
            : "",
        }}
        className={classNames(
          styles.dropdown_wrapper,
          styles[`${theme}`],
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
