import { MobileHeader } from "./mobile-header";
import { MentoLogoIcon } from "@/components/_icons";
import HeaderNav from "./header-nav";

import Link from "next/link";
import { ConnectButton } from "@/components/_shared/connect-button/connect-button.component";
import { MaxWidthWrapper } from "../max-width-wrapper";

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
    <header className="sticky top-0 z-50 mx-auto hidden h-16 w-full items-center justify-center border-b border-gray-light bg-white px-4 py-10 dark:border-[#343437] dark:bg-black lg:flex">
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
