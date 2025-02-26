"use client";

import { MobileHeader } from "./mobile-header";
import HeaderNav from "./header-nav";
import Link from "next/link";
import { MentoLogoIcon } from "@mento-protocol/ui-toolkit";
import { ConnectButton, MaxWidthWrapper } from "@/components/_shared";

export const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

const DesktopHeader = () => {
  return (
    <header className="mx-auto hidden h-32 w-full items-center justify-center bg-white px-4 py-10 dark:border-[#343437] dark:bg-black lg:flex">
      <MaxWidthWrapper>
        <div className="flex w-full items-center justify-between">
          <Link href="/">
            <MentoLogoIcon className="h-6 w-[108px]" />
          </Link>
          <HeaderNav />
          <ConnectButton />
        </div>
      </MaxWidthWrapper>
    </header>
  );
};
