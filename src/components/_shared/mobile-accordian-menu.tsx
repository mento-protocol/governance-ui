"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { links } from "@/lib/constants/links";
import { ChevronIcon } from "@/components/_icons";

const mobileMenuAccordianMenuItems = [
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

const MobileAccordianMenu = () => {
  return (
    <div className="mb-8 flex flex-col bg-white dark:bg-black">
      {mobileMenuAccordianMenuItems
        .filter(({ items }) => !!items)
        .map(({ name: headingName, items }) => {
          return (
            <Disclosure
              as="div"
              className=" mt-4 border-b border-primary-dark pb-4 leading-[118%] dark:border-white"
              key={headingName}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      open
                        ? "text-primary-blue dark:text-primary-blush pb-4"
                        : ""
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
                        className="active:text-primary-blue dark:active:text-primary-blush "
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

export default MobileAccordianMenu;
