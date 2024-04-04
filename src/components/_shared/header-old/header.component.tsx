"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import useOutsideAlerter from "@/lib/hooks/useOutsideAlerter";
import { ChevronIcon, MentoLogoIcon, MenuIcon } from "@/components/_icons";
import { Button, ConnectButton } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@/styles/helpers";

interface HeaderProps extends BaseComponentProps {}

export const Header = ({ className, style }: HeaderProps) => {
  const menuRef = useRef(null);
  useOutsideAlerter(menuRef, () => {
    setMenuOpened("");
  });

  const [menuOpened, setMenuOpened] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleMenu = (event: any, name: string) => {
    console.log("help", name);
    event.stopPropagation();
    setMenuOpened(name === menuOpened ? "" : name);
  };

  return (
    <header
      className={cn(
        className,
        "sticky top-0 z-50 bg-white px-x5 py-x6 dark:bg-black",
      )}
      style={style}
      onClick={() => setMenuOpened("")}
    >
      <div
        className={cn(
          drawerOpened && "duration-500 ease-out-circ",
          "pt-0 md:static md:translate-x-0 md:flex-row md:items-center md:justify-between md:gap-[18px]",
          "fixed bottom-0 left-0 right-0 top-0 z-40 mx-auto my-0 flex w-full max-w-[1120px] translate-x-[100%] flex-col items-start justify-start gap-[18px] transition-[transform] duration-[400ms]",
        )}
      >
        <Link href={"/"}>
          <MentoLogoIcon className="hidden md:block" />
        </Link>
        <ul
          ref={menuRef}
          className={cn(
            "flex flex-1 flex-col gap-[18px] md:flex-row md:items-center md:justify-center md:gap-[32px]",
          )}
        >
          <li className="pb-x2 md:pb-0">
            <p
              className="flex cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:text-[15px]"
              onClick={(e) => toggleMenu(e, "developers")}
            >
              <span>Developers</span>
              <span
                className={cn(
                  menuOpened === "developers" && "rotate-180",
                  "relative top-[-2px] transition-all duration-300 ease-out-back",
                )}
              >
                <ChevronIcon direction={"down"} />
              </span>
            </p>
            <ul
              className={cn(
                "md:pointer-events-auto md:absolute md:top-[60px] md:max-h-[200px] md:min-w-[200px] md:translate-x-[-25px] md:translate-y-[-25%] md:rounded-lg md:border md:border-solid md:border-black md:p-0 md:opacity-0 md:transition-[opacity_0.3s,_transform_0.3s_0.1s] md:duration-300 dark:md:border-white",
                menuOpened === "developers" &&
                  "max-h-[200px] md:pointer-events-auto md:translate-x-[-25%] md:translate-y-0 md:opacity-100 md:transition-[opacity_0.3s,_transform_0.3s] md:ease-out-back",
                "ml-x2 max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out-circ",
              )}
            >
              <li
                className={cn(
                  "md:rounded-t-lg",
                  "ml-x2 text-lg font-normal md:border-none md:pb-0 md:hover:bg-[#80808022] dark:md:hover:bg-[#80808088]",
                )}
              >
                <Link
                  className="p-x3 hover:text-inherit hover:no-underline md:block md:h-full md:p-x3 md:no-underline md:hover:text-black dark:md:hover:text-white"
                  href="#"
                >
                  <p className="cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:block md:text-center md:text-[15px]">
                    Docs
                  </p>
                </Link>
              </li>
              <li
                className={cn(
                  "ml-x2 text-lg font-normal md:rounded-b-lg md:pb-0",
                )}
              >
                <Link
                  className="p-x3 hover:text-inherit hover:no-underline md:block md:h-full md:p-x3 md:no-underline md:hover:text-black dark:md:hover:text-white"
                  href="#"
                >
                  <p className="cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:block md:text-center md:text-[15px]">
                    Github
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="pb-x2 md:pb-0">
            <p
              className="flex cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:text-[15px]"
              onClick={(e) => toggleMenu(e, "community")}
            >
              <span>Community</span>
              <span
                className={cn(
                  menuOpened === "community" && "rotate-180",
                  "relative top-[-2px] transition-all duration-300 ease-out-back",
                )}
              >
                <ChevronIcon direction={"down"} />
              </span>
            </p>
            <ul
              className={cn(
                "md:pointer-events-auto md:absolute md:top-[60px] md:max-h-[200px] md:min-w-[200px] md:translate-x-[-25px] md:translate-y-[-25%] md:rounded-lg md:border md:border-solid md:border-black md:p-0 md:opacity-0 md:transition-[opacity_0.3s,_transform_0.3s_0.1s] md:duration-300 dark:md:border-white",
                menuOpened === "community" &&
                  "max-h-[200px] md:pointer-events-auto md:translate-x-[-25%] md:translate-y-0 md:opacity-100 md:transition-[opacity_0.3s,_transform_0.3s] md:ease-out-back",
                "ml-x2 max-h-0 overflow-hidden transition-[max-height] duration-300 ease-out-circ",
              )}
            >
              <li
                className={cn(
                  "ml-x2 text-lg font-normal md:rounded-t-lg md:pb-0",
                )}
              >
                <Link
                  className="p-x3 hover:text-inherit hover:no-underline md:block md:h-full md:p-x3 md:no-underline md:hover:text-black dark:md:hover:text-white"
                  href="#"
                >
                  <p className="cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:block md:text-center md:text-[15px]">
                    Forum
                  </p>
                </Link>
              </li>
              <li className="ml-x2 text-lg font-normal md:pb-0"></li>
              <li className="ml-x2 text-lg font-normal md:rounded-b-lg md:pb-0">
                <Link
                  className="p-x3 hover:text-inherit hover:no-underline md:block md:h-full md:border-none md:p-x3 md:no-underline md:hover:text-black dark:md:hover:text-white"
                  href="#"
                >
                  <p className="cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:block md:text-center md:text-[15px]">
                    Twitter
                  </p>
                </Link>
              </li>
            </ul>
          </li>
          <li className="md:pb-0">
            <Link className="hover:text-inherit hover:no-underline" href="#">
              <p className="cursor-pointer flex-row items-center justify-start gap-x1 text-xl md:text-[15px]">
                Team
              </p>
            </Link>
          </li>
        </ul>
        <ConnectButton />
      </div>
      <div className="absolute left-0 right-0 top-0 z-50 mx-x2 flex items-center justify-between border-b border-solid border-black p-x2 dark:border-white md:hidden">
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
