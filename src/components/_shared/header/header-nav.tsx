"use client";

import React from "react";

import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import { links } from "@/lib/constants/links";
import { ChevronIcon } from "@/components/_icons";
const headerMenuItems: {
  name: string;
  items?: { name: string; href: string }[];
  href?: string;
}[] = [
  {
    name: "Developers",
    items: [
      { name: "Documentation", href: links.docs },
      { name: "Github", href: links.github },
    ],
  },
  {
    name: "Community",
    items: [
      { name: "Forum", href: links.forum },
      { name: "Discord", href: links.discord },
      { name: "Twitter", href: links.twitter },
    ],
  },
];

const HeaderNav = () => {
  return (
    <nav className="flex gap-9 font-inter text-[15px] dark:text-white">
      {headerMenuItems.map(({ name, items, href }) => {
        if (!items && href) {
          return (
            <Link
              className="hover:no-underline"
              key={name}
              href={href}
              target="_blank"
            >
              {name}
            </Link>
          );
        }

        return (
          <div key={name} className="relative">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="flex items-center justify-center gap-1 outline-offset-4 outline-primary transition duration-150 ease-in-out hover:text-primary">
                    {name}
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronIcon direction="down" />
                    </motion.div>
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      as={motion.div}
                      static
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 z-10 mt-1 flex -translate-x-1/2 transform flex-col items-center justify-center rounded border border-black bg-white focus:outline-none dark:border-white dark:bg-black"
                    >
                      {items?.map(({ name, href }, index) => (
                        <Menu.Item key={name}>
                          {({ active }) => (
                            <Link
                              className={`${active ? " text-primary" : ""}  ${
                                index === items.length - 1
                                  ? ""
                                  : "border-b border-b-black dark:border-b-white"
                              }  block w-full px-8 py-2 text-center hover:no-underline`}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  )}
                </>
              )}
            </Menu>
          </div>
        );
      })}
    </nav>
  );
};

export default HeaderNav;
