"use client";
import { usePathname } from "next/navigation";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { ChevronIcon, DiscordIcon, LearnMoreIcon } from "@/components/_icons";

import { Button } from "@/components/_shared";
import { cn } from "@/styles/helpers";

interface LearnMoreProps extends BaseComponentProps {}

export const LearnMore = ({ className, style }: LearnMoreProps) => {
  const pathname = usePathname();

  return (
    <div className={cn("mb-auto mt-x4 ", className)} style={style}>
      <div className="mx-auto w-full max-w-[1120px]">
        {pathname === "/" && (
          <div className="flex flex-col items-center justify-between gap-x3 bg-black-off px-x5 py-0 lg:flex-row lg:pl-x13 lg:pr-x11">
            <div className="max-w-[500px] text-white">
              <h2 className="my-x1 mb-x5 text-center text-6xl font-semibold lg:text-left">
                Learn more
              </h2>
              <p className="text-x3 leading-x5 text-center lg:text-left">
                If you&apos;re interested in learning more about Mento, finding
                out what the team is working on now, or would like to
                contribute, please join our discord server.
              </p>
              <Button
                className="mt-x4 w-full max-w-full sm:mx-auto sm:block sm:max-w-[200px] lg:mx-0 lg:inline-block"
                href="https://discord.gg"
                target="_blank"
              >
                <div className="flex items-center gap-x2 px-x3">
                  <DiscordIcon />
                  <span>Join the community</span>
                  <ChevronIcon direction="right" />
                </div>
              </Button>
            </div>
            <div>
              <LearnMoreIcon className="h-auto max-w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
