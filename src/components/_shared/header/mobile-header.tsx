"use client";

import React from "react";

import { MotionConfig, motion } from "framer-motion";

import { links } from "@/lib/constants/links";
import Link from "next/link";

import { useAccount } from "wagmi";

import {
  DiscordIcon,
  GithubIcon,
  MentoLogoIcon,
  TwitterIcon,
} from "@/components/_icons";
import {
  DisconnectButton,
  MobileAccordionMenu,
  ThemeSwitch,
} from "@/components/_shared";
import { cn } from "@/styles/helpers";
import { ConnectButton } from "@/components/_shared";

const variants = {
  open: { opacity: 1, x: 0, y: 21 },
  closed: { opacity: 0, x: "100%", y: 21 },
};

export const MobileHeader = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { address } = useAccount();

  const toggleMenu = () => setIsOpen((currIsOpenStatus) => !currIsOpenStatus);

  return (
    <header className="w-full px-4 lg:hidden">
      <div className="flex items-center justify-between border-b border-black p-4 dark:border-[#343437]">
        <MentoLogoIcon className="h-5 w-[90px]" />
        <AnimatedHamburgerButton
          className="pr-4"
          isOpen={isOpen}
          onClick={toggleMenu}
        />
        <DropDownMenuOverlay isOpen={isOpen} address={address} />
      </div>
    </header>
  );
};

const DropDownMenuOverlay = ({
  isOpen,
  address,
}: {
  isOpen: boolean;
  address?: string;
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 top-5 z-50 flex h-screen w-screen flex-col bg-white p-4 dark:bg-black"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.8 }}
      >
        <MobileAccordionMenu />
        <div className="flex w-full flex-col items-center justify-center">
          {address ? (
            <div className="mt-5 flex w-full flex-col items-center justify-center">
              <DisconnectButton>Disconnect Wallet</DisconnectButton>
            </div>
          ) : (
            <ConnectButton theme="primary" />
          )}

          <div className="mt-8 flex flex-col items-center">
            <SocialLinks />
            <div>
              <span className="text-[15px]">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const SocialLinks = () => {
  return (
    <nav className="items-center-justify-center mx-auto flex">
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.twitter}
      >
        <TwitterIcon height={41} width={41} />
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

const AnimatedHamburgerButton = ({
  isOpen,
  onClick,
  className,
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={isOpen ? "open" : "closed"}
        onClick={onClick}
        className={cn(
          "relative h-[20px] w-5  rounded-full transition-colors ",
          className,
        )}
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute top-0 h-[2px] w-full -translate-y-1/2 translate-x-1/2 transform bg-black dark:bg-white"
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute top-1/2 h-[2px] w-full -translate-y-1/2 translate-x-1/2 transform bg-black dark:bg-white"
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute top-full h-[2px] w-full -translate-y-1/2 translate-x-1/2 transform bg-black dark:bg-white"
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["0%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "0%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
      top: ["100%", "50%", "50%"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
      top: ["50%", "50%", "100%"],
    },
  },
};
