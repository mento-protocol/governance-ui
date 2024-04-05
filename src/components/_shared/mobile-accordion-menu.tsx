"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { links } from "@/lib/constants/links";
import { ChevronIcon } from "@/components/_icons";

const mobileMenuAccordionMenuItems = [
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
    name: "Other",
    items: [{ name: "Team", href: links.mentolabs }],
  },
];

export const MobileAccordionMenu = () => {
  return (
    <div className="mb-8 flex flex-col bg-white dark:bg-black">
      {mobileMenuAccordionMenuItems
        .filter(({ items }) => !!items)
        .map(({ name: headingName, items }) => {
          return (
            <Disclosure
              as="div"
              className=" mt-4 border-b border-black pb-4 leading-[118%] dark:border-white"
              key={headingName}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      open ? "pb-4 text-primary dark:text-secondary" : ""
                    }  text-fg flex w-full justify-between text-left text-[17px] font-medium`}
                  >
                    {headingName}

                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronIcon direction="down" />
                    </motion.span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex flex-col justify-around gap-4">
                    {items?.map(({ name, href }) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="active:text-primary dark:active:text-secondary"
                        key={name}
                        href={href}
                      >
                        {name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
    </div>
  );
};
