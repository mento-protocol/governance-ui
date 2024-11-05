import { MobileHeader } from "./mobile-header";
import { MentoLogoIcon } from "@/components/_icons";
import HeaderNav from "./header-nav";

import Link from "next/link";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { ConnectButton } from "@/components/_shared";

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
