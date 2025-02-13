"use client";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import useOutsideAlerter from "@/lib/hooks/useOutsideAlerter";
import { ChevronIcon } from "@/components/_icons";
import { Dropdown, DropdownElement } from "./dropdown-button.addons";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@mento-protocol/ui-toolkit";
import { Button } from "@mento-protocol/ui-toolkit";

const variants = cva(
  "[transition:opacity_0.3s,_transform 0.3s_0.1s_ease-in,_z-index_0.1s_1s] pointer-events-none absolute top-x14 z-[-1] min-w-full -translate-y-x10 overflow-hidden opacity-0 md:w-64",
  {
    variants: {
      align: {
        left: "left-0",
        right: "right-0",
      },
      fullwidth: { true: "", false: "max-w-64" },
      opened: {
        true: "pointer-events-auto z-10 translate-y-0 opacity-100",
        false: "",
      },
      theme: {
        primary: cn(
          "border-primary-dark bg-primary text-white",
          "[&_.dropdown_element]:border-primary-dark",
        ),
        secondary: cn(
          "border-secondary-dark bg-secondary text-black",
          "[&_.dropdown_element]:border-secondary-dark",
        ),
        success: cn(
          "border-success-dark bg-success text-black",
          "[&_.dropdown_element]:border-success-dark",
        ),
        danger: cn(
          "border-error-dark bg-error text-white",
          "[&_.dropdown_element]:border-error-dark",
        ),
        warning: cn(
          "border-warning-dark bg-warning text-black",
          "[&_.dropdown_element]:border-warning-dark",
        ),
        info: cn(
          "border-info-dark bg-info text-black",
          "[&_.dropdown_element]:border-info-dark",
        ),
        tertiary: cn(
          "border-gray bg-white text-black",
          "dark:border-white dark:bg-black dark:text-white",
          "[&_.dropdown_element]:border-gray dark:[&_.dropdown_element]:border-white",
        ),
        link: cn(
          "border-gray bg-white text-black",
          "dark:border-white dark:bg-black dark:text-white",
          "[&_.dropdown_element]:border-gray dark:[&_.dropdown_element]:border-white",
        ),
        clear: cn(
          "border-gray bg-white text-black",
          "dark:border-white dark:bg-black dark:text-white",
          "[&_.dropdown_element]:border-gray dark:[&_.dropdown_element]:border-white",
        ),
      },
    },
    compoundVariants: [
      {
        opened: true,
        theme: "clear",
        className:
          "[&_button:hover]:bg-gray-lighter [&_button:hover]:!text-black [&_button:hover]:!text-black dark:[&_button:hover]:!text-black [&_button:hover_path]:stroke-black",
      },
    ],
    defaultVariants: {
      align: "left",
      fullwidth: false,
      opened: false,
      theme: "primary",
    },
  },
);

type DropdownButtonProps = ComponentProps<"button"> &
  ComponentProps<"a"> &
  VariantProps<typeof variants> & {
    title?: string;
    avatar?: ReactNode;
    buttonClassName?: string;
  };

export const DropdownButton = ({
  theme = "primary",
  className,
  children,
  title,
  fullwidth,
  buttonClassName,
  avatar,
}: DropdownButtonProps) => {
  const [alignment, setAlignment] = useState<"left" | "right">("right");
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
      setAlignment("left");
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
      className={cn(
        "relative",
        fullwidth && "w-full",
        dropdownOpened && "opened",
        className,
      )}
    >
      <Button
        fullwidth={fullwidth}
        theme={theme}
        className={cn("min-w-x12", buttonClassName)}
        onClick={() => setDropdownOpened(!dropdownOpened)}
      >
        {!!avatar && avatar}
        {title}
        <span
          className={cn(
            "transition-[transform] duration-300 ease-out-back",
            dropdownOpened && "rotate-180",
          )}
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
        className={cn(
          variants({
            align: alignment,
            theme,
            fullwidth,
            opened: dropdownOpened,
            className,
          }),
        )}
      >
        {children}
      </div>
    </div>
  );
};

DropdownButton.Element = DropdownElement;
DropdownButton.Dropdown = Dropdown;
