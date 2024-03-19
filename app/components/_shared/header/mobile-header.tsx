"use client";

import React from "react";

import { motion } from "framer-motion";

import { links } from "@/app/helpers/constants";
import Link from "next/link";

// import ThemeSwitch from "./ThemeSwitch";
import { Button } from "@/app/components/_shared/button/button.component";
import MobileAccordianMenu from "./mobile-accordian-menu";
// import { DisconnectButton } from "@/components/disconnect-button";
import { useAccount } from "wagmi";
// import ClientOnly from "./client-only";
import {
  DiscordIcon,
  GithubIcon,
  MentoLogoIcon,
  MobileMenuHamburger,
  MobileMenuX,
  TwitterIcon,
} from "@/app/components/_icons";
import { ThemeSwitch } from "../../theme-switch/theme-switch.component";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: "-100%" },
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address } = useAccount();

  return (
    <header className="px-4 lg:hidden">
      <div className="flex items-center justify-between py-4 border-b border-b-primary-dark">
        <MentoLogoIcon className="h-5 w-[90px]" />
        <button
          className="w-5 h-5 text-primary-dark"
          onClick={() => setIsOpen(true)}
        >
          <MobileMenuHamburger className="text-primary-dark dark:text-white" />
        </button>
        <DropDownMenuOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          address={address}
        />
      </div>
    </header>
  );
};

const DropDownMenuOverlay = ({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  address?: string;
}) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 flex flex-col w-full h-full p-4 bg-white dark:bg-primary-dark"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between mb-12">
          <MentoLogoIcon className="h-5 w-[90px]" />
          <button onClick={() => setIsOpen(false)}>
            <MobileMenuX className="w-5 h-5" />
          </button>
        </div>
        <MobileAccordianMenu />
        <div className="flex flex-col w-full justify-center items-center">
          <Button
            href={links.app}
            // icon={<ChevronRight />}
            // fullWidth
            // noFlexZone={true}
            // width="w-[340px] sm:w-[260px] md:w-[260px]"
          >
            Open app
          </Button>

          {address ? (
            <div className="flex flex-col w-full justify-center items-center mt-5">
              <div
              // width="w-[340px] sm:w-[260px] md:w-[260px]"
              // color="blush"
              >
                Disconnect Wallet
              </div>
            </div>
          ) : null}

          <div className="flex flex-col items-center ">
            <SocialLinks className="mt-[20%]" />
            <div className="grow"> </div>
            <div>
              <span className="dark:text-body-dark text-[15px]">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SocialLinks = ({ className = "" }: { className?: string }) => {
  return (
    <nav className={`${className} flex mx-auto items-center-justify-center`}>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.twitter}
      >
        <TwitterIcon />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.github}
      >
        <GithubIcon height={41} width={41} />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.discord}
      >
        <DiscordIcon height={41} width={41} />
      </Link>
    </nav>
  );
};
