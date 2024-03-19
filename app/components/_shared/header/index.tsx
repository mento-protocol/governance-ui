import { MobileHeader } from "./mobile-header";
import { MentoLogoIcon } from "@/app/components/_icons";
import HeaderNav from "./header-nav";

import Link from "next/link";
import { ConnectButton } from "@/app/components/_shared/connect-button/connect-button.component";

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
    <header className="items-center px-4 lg:px-10 xl:px-0 hidden h-16 pt-10 max-w-[1120px] mx-auto justify-between lg:flex w-full">
      <Link href="/">
        <MentoLogoIcon className="w-[108px] h-6" />
      </Link>
      <HeaderNav />
      <ConnectButton />
    </header>
  );
};
