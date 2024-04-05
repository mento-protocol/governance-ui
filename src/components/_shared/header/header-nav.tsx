"use client";

import React from "react";

import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import { links } from "@/lib/constants/links";
import { ChevronIcon } from "@/components/_icons";

const headerMenuItems = [
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
  {
    name: "Team",
    href: links.mentolabs,
  },
];

const HeaderNav = () => {
  return (
    <div className="flex gap-9 font-inter text-[15px] dark:text-white">
      {headerMenuItems.map(({ name, items, href }) => {
        if (!items) {
          return (
            <Link key={name} href={href}>
              {name}
            </Link>
          );
        }

        return (
          <div key={name} className="relative">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="outline-primary-blue flex items-center justify-center gap-1 outline-offset-4 transition duration-150 ease-in-out hover:text-primary">
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
                      className="absolute right-0 z-10 mt-1 flex flex-col items-center justify-center rounded border border-primary-dark bg-white focus:outline-none dark:border-white dark:bg-primary-dark"
                    >
                      {items.map(({ name, href }, index) => (
                        <Menu.Item key={name}>
                          {({ active }) => (
                            <Link
                              className={`${
                                active ? "bg-primary-blue text-white" : ""
                              }  ${
                                index === items.length - 1
                                  ? ""
                                  : "border-b border-b-primary-dark dark:border-b-white"
                              }  block w-full px-8 py-2  text-center`}
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
    </div>
  );
};

export default HeaderNav;
