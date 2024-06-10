import Link from "next/link";

import {
  DiscordIcon,
  GithubIcon,
  MentoLogoIcon,
  TwitterIcon,
} from "@/components/_icons";
import { links } from "@/lib/constants/links";
import { MobileAccordionMenu, ThemeSwitch } from "@/components/_shared";

export const Footer = () => {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
    </>
  );
};

const DesktopFooter = () => {
  return (
    <footer className="mx-auto mt-36 hidden items-start justify-between gap-16 border-t border-black px-4 pb-20 pt-20 dark:border-[#343437] lg:mx-10 lg:flex xl:mx-auto xl:max-w-[1120px] xl:gap-36">
      <div>
        <MentoLogoIcon />
        <p className="pt-3 font-inter text-[#636768] ">
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
    <footer className="bg-black px-4 pb-8 pt-10 lg:hidden">
      <div className="border-t border-black dark:border-gray-light">
        <MobileAccordionMenu classNames="bg-transparent" />
        <div className="mt-6 flex justify-between">
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
    <nav className="flex flex-1 justify-between">
      {Object.entries(footerMenuItems).map(([heading, links]) => {
        return (
          <div key={heading}>
            <h4 className="text-body-light mb-[10px] font-fg text-[20px] font-medium leading-none text-[#636768] dark:text-[#8F9394]">
              {heading}
            </h4>
            <ul className="flex flex-col font-inter text-[15px]">
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
      <Link target="_blank" rel="noopener noreferrer" href={links.twitter}>
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
