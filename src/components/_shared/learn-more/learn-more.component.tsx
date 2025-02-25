"use client";
import { usePathname } from "next/navigation";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import {
  Button,
  ChevronIcon,
  cn,
  DiscordIcon,
  LearnMoreIcon,
} from "@mento-protocol/ui-toolkit";

interface LearnMoreProps extends BaseComponentProps {}

export const LearnMore = ({ className, style }: LearnMoreProps) => {
  const pathname = usePathname();

  return (
    <div className={cn("mt-x4 mb-auto", className)} style={style}>
      <div className="mx-auto w-full max-w-[1120px]">
        {pathname === "/" && (
          <div className="gap-x3 px-x5 lg:pl-x13 lg:pr-x11 flex flex-col items-center justify-between bg-[#121316] py-0 lg:flex-row">
            <div className="max-w-[500px] text-white">
              <h2 className="my-x1 mb-x5 text-center text-[44px] font-semibold lg:text-left">
                Learn more
              </h2>
              <p className="text-center text-[15px] leading-[25px] lg:text-left">
                If you&apos;re interested in learning more about Mento, finding
                out what the team is working on now, or would like to
                contribute, please join our discord server.
              </p>
              <Button
                className="mt-x4 w-full max-w-full sm:mx-auto sm:block sm:max-w-[200px] lg:mx-0 lg:inline-block"
                href="https://discord.gg"
                target="_blank"
              >
                <div className="gap-x2 px-x3 flex items-center">
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
