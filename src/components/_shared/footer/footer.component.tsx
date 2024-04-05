import Link from "next/link";

import { ThemeSwitch } from "@/components/_shared/theme-switch/theme-switch.component";
import {
  DiscordIcon,
  GithubIcon,
  MentoLogoIcon,
  TwitterIcon,
} from "@/components/_icons";
import MobileAccordianMenu from "../mobile-accordian-menu";
import { links } from "@/lib/constants/links";

const Footer = () => {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
    </>
  );
};

export default Footer;

const DesktopFooter = () => {
  return (
    <footer className="mx-auto mt-36 hidden justify-between border-t border-black px-4 pb-20 pt-20 dark:border-[#343437] lg:mx-10 lg:flex lg:gap-16 xl:mx-auto xl:max-w-[1120px] xl:gap-36">
      <div className="-mt-2">
        <MentoLogoIcon />
        <p className="text-body-light pt-3">
          Mento © 2024. <br />
          All rights reserved.
        </p>
      </div>
      <FooterNav />
      <div className="flex flex-col gap-8">
        <SocialLinks />
        <div className="flex justify-between">
          <span className="dark:text-body-dark">Theme</span>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};

const MobileFooter = () => {
  return (
    <footer className="mt-10 px-4 pb-8 lg:hidden">
      <div className="border-t border-black dark:border-gray-light">
        <MobileAccordianMenu />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <MentoLogoIcon className="h-5 w-[90px]" />
            <p className="text-body-light pt-4">
              Mento © 2024. <br />
              All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <SocialLinks />
            <div className="flex justify-between">
              <span className="dark:text-body-dark">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterNav = () => {
  return (
    <nav className="flex flex-1 justify-between ">
      {Object.entries(footerMenuItems).map(([heading, links]) => {
        return (
          <div key={heading}>
            <h3 className="text-body-light mb-3 font-fg font-medium">
              {heading}
            </h3>
            <ul className="flex flex-col gap-3">
              {links.map(({ title, href, isDownload }) => {
                return (
                  <Link
                    key={title}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                    download={isDownload}
                  >
                    {title}
                  </Link>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};

const SocialLinks = () => {
  return (
    <nav className="dark:text-clean-white -mt-[10px] flex">
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.twitter}
      >
        <TwitterIcon className="text-black dark:text-white" />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.github}
      >
        <GithubIcon className="dark:text-clean-white" />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.discord}
      >
        <DiscordIcon className="dark:text-clean-white" />
      </Link>
    </nav>
  );
};

const footerMenuItems = {
  Developers: [
    { title: "Docs", href: links.docs, isDownload: false },
    { title: "Github", href: links.github, isDownload: false },
  ],
  Community: [
    { title: "Forum", href: links.forum, isDownload: false },
    { title: "Discord", href: links.discord, isDownload: false },
    { title: "Twitter", href: links.twitter, isDownload: false },
  ],
  Other: [
    { title: "Team", href: links.mentolabs, isDownload: false },
    { title: "Cookie Policy", href: links.cookiePolicy, isDownload: true },
  ],
};
