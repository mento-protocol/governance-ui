"use client";

import React from "react";

import { motion } from "framer-motion";
import { Menu } from "@headlessui/react";
import Link from "next/link";

import { links } from "@/app/helpers/constants";
import { DownChevron } from "@/app/components/_icons";

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
    <div className="flex gap-9 dark:text-white">
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
                  <Menu.Button className="flex items-center justify-center gap-1 transition duration-150 ease-in-out outline-offset-4 outline-primary-blue">
                    {name}
                    <motion.div
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DownChevron />
                    </motion.div>
                  </Menu.Button>
                  {open && (
                    <Menu.Items
                      as={motion.div}
                      static
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 z-10 flex flex-col items-center justify-center mt-1 border rounded focus:outline-none bg-white border-primary-dark dark:border-white dark:bg-primary-dark"
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
                              }  px-8 py-2 text-center w-full  block`}
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
