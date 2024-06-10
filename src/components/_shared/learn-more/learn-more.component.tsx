"use client";
import { usePathname } from "next/navigation";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { ChevronIcon, DiscordIcon, LearnMoreIcon } from "@/components/_icons";

import { Button } from "@/components/_shared";
import exports from "@/styles/exports.module.scss";

import styles from "./learn-more.module.scss";
import { cn } from "@/styles/helpers";

interface LearnMoreProps extends BaseComponentProps {}

export const LearnMore = ({ className, style }: LearnMoreProps) => {
  const pathname = usePathname();

  return (
    <div className={cn("mt-x4", className)} style={style}>
      <div className="main-container">
        {pathname === "/" && (
          <div className={cn(styles.learn_more)}>
            <div className={cn(styles.content)}>
              <h2 className="my-x1 text-6xl font-semibold">Learn more</h2>
              <p className={styles.description}>
                If you&apos;re interested in learning more about Mento, finding
                out what the team is working on now, or would like to
                contribute, please join our discord server.
              </p>
              <Button
                className={cn(styles.button, "mt-x4")}
                href="https://discord.gg"
                target="_blank"
              >
                <div className={styles.button__content}>
                  <DiscordIcon color={exports.white} />
                  <span>Join the community</span>
                  <ChevronIcon direction="right" color={exports.white} />
                </div>
              </Button>
            </div>
            <div className={styles.learn_more__icon}>
              <LearnMoreIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
