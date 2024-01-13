import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from "./footer.module.scss";
import classNames from "classnames";
import {
  ChevronIcon,
  DiscordIcon,
  GithubIcon,
  MentoLogoIcon,
  TwitterIcon,
  LearnMoreIcon,
} from "@components/_icons";
import Link from "next/link";
import { Button } from "@components/_shared";
import exports from "@styles/exports.module.scss";
import { usePathname } from "next/navigation";
import { ThemeSwitch } from "../../theme-switch/theme-switch.component";

interface FooterProps extends BaseComponentProps {}

export const Footer = ({ className, style }: FooterProps) => {
  const year = new Date().getFullYear();

  const pathname = usePathname();

  return (
    <footer className={classNames("mt-x5", className)} style={style}>
      <div className="main-container">
        {pathname === "/" && (
          <div className={classNames(styles.learn_more)}>
            <div className={classNames(styles.content)}>
              <h2 className="text-6xl font-semibold my-x1">Learn more</h2>
              <p className={styles.description}>
                If you&apos;re interested in learning more about Mento, finding
                out what the team is working on now, or would like to
                contribute, please join our discord server.
              </p>
              <Button
                className={classNames(styles.button, "mt-x4")}
                href="https://discord.gg"
                target="_blank"
              >
                <div className={styles.button__content}>
                  <DiscordIcon useThemeColor={false} color={exports.white} />
                  <span>Join the community</span>
                  <ChevronIcon
                    direction="right"
                    useThemeColor={false}
                    color={exports.white}
                  />
                </div>
              </Button>
            </div>
            <div className={styles.learn_more__icon}>
              <LearnMoreIcon />
            </div>
          </div>
        )}
        <div className={styles.footer}>
          <div
            className={classNames(styles.footer__element, styles.footer__mento)}
          >
            <MentoLogoIcon className="mb-x1" useThemeColor />
            <div> Mento © {year}2023.</div>
            <div>All right reserved.</div>
          </div>
          <div className={classNames(styles.footer__element)}>
            <strong>Developers</strong>
            <Link href="#">
              <p>Docs</p>
            </Link>
            <Link href="#">
              <p>Github</p>
            </Link>
          </div>
          <div className={classNames(styles.footer__element)}>
            <strong>Community</strong>
            <Link href="#">
              <p>Forum</p>
            </Link>
            <Link href="#">
              <p>Discord</p>
            </Link>
            <Link href="#">
              <p>Twitter</p>
            </Link>
          </div>
          <div className={styles.footer__element}>
            <strong>Other</strong>
            <Link href="#">
              <p>Team</p>
            </Link>
            <Link href="#">
              <p>Roadmap</p>
            </Link>
          </div>
          <div
            className={classNames(styles.footer__element, "justify-between")}
          >
            <div className="flex gap-x3 place-items-center">
              <Link href="#">
                <TwitterIcon useThemeColor />
              </Link>
              <Link href="#" className="p-x2">
                <DiscordIcon useThemeColor />
              </Link>
              <Link href="#" className="p-x2">
                <GithubIcon useThemeColor />
              </Link>
            </div>
            <div className={classNames("flex", styles.theme)}>
              <span className="mr-x3">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
