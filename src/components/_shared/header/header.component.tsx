"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import useOutsideAlerter from "@/lib/hooks/useOutsideAlerter";
import { ChevronIcon, MentoLogoIcon, MenuIcon } from "@/components/_icons";
import { Button, ConnectButton } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@/styles/helpers";

interface HeaderProps extends BaseComponentProps {}

const enum MenuState {
  CLOSED,
  DEV,
  COM,
}

export const Header = ({ className, style }: HeaderProps) => {
  const menuRef = useRef(null);

  const [menuState, setMenuState] = useState<MenuState>(MenuState.CLOSED);
  const [drawerOpened, setDrawerOpened] = useState(false);

  useOutsideAlerter(menuRef, () => {
    setMenuState(MenuState.CLOSED);
  });

  const toggleMenu = useCallback(
    (menu: MenuState) => {
      setMenuState(menu !== menuState ? menu : MenuState.CLOSED);
    },
    [menuState],
  );

  return (
    <header
      className={cn(
        className,
        "sticky top-0 z-50 bg-white px-x5 py-x6 dark:bg-black",
      )}
      style={style}
      // onClick={() => setMenuState(MenuState.CLOSED)}
    >
      <div
        className={cn(
          drawerOpened && "duration-500 ease-out-circ",
          "pt-0 md:static md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-[18px]",
          "fixed bottom-0 left-0 right-0 top-0 z-40 mx-auto my-0 flex w-full max-w-[1120px] translate-x-[100%] flex-col items-start justify-start gap-[18px] transition-[transform] duration-[400ms]",
        )}
      >
        <Link
          className="absolute left-0 top-[50%] hidden h-full translate-y-[-50%] flex-col justify-center md:flex"
          href={"/"}
        >
          <MentoLogoIcon />
        </Link>
        <nav
          ref={menuRef}
          className={cn(
            "flex flex-1 flex-col gap-[18px] md:flex-row md:items-center md:justify-center md:gap-[16px]",
          )}
        >
          <div
            onClick={() => toggleMenu(MenuState.DEV)}
            className={cn(
              "group relative flex cursor-pointer flex-row items-center justify-start gap-x1 px-x1 py-x2",
              menuState === MenuState.DEV && "open",
            )}
          >
            <span>Developers</span>
            <span
              className={cn(
                "relative top-[-2px] transition-all duration-300 ease-out-back group-[&.open]:rotate-180",
              )}
            >
              <ChevronIcon direction={"down"} />
            </span>
            <div
              className={cn(
                "absolute top-[100%] flex flex-col items-center justify-center overflow-hidden",
                "text-lg font-normal",
                "rounded-lg border border-solid border-black",
                "bg-white  dark:bg-black",
                "max-h-0 opacity-0 transition-[opacity] duration-300 ease-out-back",
                "group-[&.open]:max-h-[20vh] group-[&.open]:opacity-100",
              )}
            >
              <Link
                className={cn(
                  "block p-x3",
                  "w-full text-center",
                  "md:hover:bg-[#80808022] dark:md:hover:bg-[#80808088]",
                  "transition-[background-color_color] duration-300",
                  "no-underline hover:text-black hover:no-underline dark:hover:text-white",
                )}
                href="#"
              >
                Docs
              </Link>
              <Link
                className={cn(
                  "block p-x3",
                  "w-full text-center",
                  "md:hover:bg-[#80808022] dark:md:hover:bg-[#80808088]",
                  "transition-[background-color_color] duration-300",
                  "no-underline hover:text-black hover:no-underline dark:hover:text-white",
                )}
                href="#"
              >
                Github
              </Link>
            </div>
          </div>
          <div
            onClick={(e) => toggleMenu(MenuState.COM)}
            className={cn(
              "group relative flex cursor-pointer flex-row items-center justify-start gap-x1 px-x1 py-x2",
              menuState === MenuState.COM && "open",
            )}
          >
            <span>Community</span>
            <span
              className={cn(
                "relative top-[-2px] transition-all duration-300 ease-out-back group-[&.open]:rotate-180",
              )}
            >
              <ChevronIcon direction={"down"} />
            </span>
            <div
              className={cn(
                "absolute top-[100%] flex flex-col items-center justify-center overflow-hidden",
                "text-lg font-normal",
                "rounded-lg border border-solid border-black",
                "bg-white  dark:bg-black",
                "max-h-0 opacity-0 transition-[opacity] duration-300 ease-out-back",
                "group-[&.open]:max-h-[20vh] group-[&.open]:opacity-100",
              )}
            >
              <Link
                className={cn(
                  "block p-x3",
                  "w-full text-center",
                  "md:hover:bg-[#80808022] dark:md:hover:bg-[#80808088]",
                  "transition-[background-color_color] duration-300",
                  "no-underline hover:text-black hover:no-underline dark:hover:text-white",
                )}
                href="#"
              >
                Forum
              </Link>
              <Link
                className={cn(
                  "block p-x3",
                  "w-full text-center",
                  "md:hover:bg-[#80808022] dark:md:hover:bg-[#80808088]",
                  "transition-[background-color_color] duration-300",
                  "no-underline hover:text-black hover:no-underline dark:hover:text-white",
                )}
                href="#"
              >
                Twitter
              </Link>
            </div>
          </div>
          <div className="relative md:pb-0">
            <Link
              className="block h-full p-x2 no-underline hover:text-inherit hover:no-underline md:hover:text-black dark:md:hover:text-white"
              href="#"
            >
              Docs
            </Link>
          </div>
        </nav>
        <ConnectButton className="absolute right-0 top-[50%] translate-y-[-50%]" />
      </div>
      <div className="absolute left-0 right-0 top-0 z-50 mx-x2 flex items-center justify-between border-b border-solid border-black px-x1 py-x2 dark:border-white md:hidden">
        <Link href={"/"}>
          <MentoLogoIcon />
        </Link>
        <Button theme="link" onClick={() => setDrawerOpened(!drawerOpened)}>
          <MenuIcon opened={drawerOpened} />
        </Button>
      </div>
    </header>
  );
};
