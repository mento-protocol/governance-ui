import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from './footer.module.scss';
import classNames from "classnames";
import {ChevronIcon, DiscordIcon, GithubIcon, MentoLogoIcon, TwitterIcon} from "@components/_icons";
import Link from "next/link";
import Image from "next/image";
import learnMoreImage from '@/app/assets/learn_more_image.png';
import {Button} from "@components/_shared";
import exports from '@styles/exports.module.scss';

interface FooterProps extends BaseComponentProps {
}

export const Footer = ({className, children, style}: FooterProps) => {

    const year = (new Date()).getFullYear();

    return (
        <footer style={style}>
            <div className={classNames(styles.learn_more)}>
                <div className={classNames(styles.description)}>
                    <h2 className="text-6xl font-semibold my-2">Learn more</h2>
                    <p className="my-8 text-gray-400 font-light">If you&apos;re interested in learning more about Mento, finding out what the team is working on now, or would like to contribute, please join our discord server.</p>
                    <Button className="mt-4" href="https://discord.gg" target="_blank">
                        <DiscordIcon useThemeColor={false} color={exports.white}/>
                        <span>Join the community</span>
                        <ChevronIcon direction="right" useThemeColor={false} color={exports.white}/>
                    </Button>
                </div>
                <div className="hidden md:block">
                    <Image src={learnMoreImage} alt="Learn more about Mento"/>
                </div>
            </div>
            <div className={classNames(styles.footer, className)}>
                <div className={classNames(styles.footer__element)}>
                    <MentoLogoIcon className="mb-4" useThemeColor/>
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
                        <p>Twiter</p>
                    </Link>
                </div>
                <div className={classNames(styles.footer__element)}>
                    <strong>Other</strong>
                    <Link href="#">
                        <p>Team</p>
                    </Link>
                    <Link href="#">
                        <p>Roadmap</p>
                    </Link>
                </div>
                <div className={classNames(styles.footer__element, 'justify-between')}>
                    <div className="flex gap-default place-items-center">
                        <Link href="#">
                            <TwitterIcon useThemeColor/>
                        </Link>
                        <Link href="#">
                            <DiscordIcon useThemeColor/>
                        </Link>
                        <Link href="#">
                            <GithubIcon useThemeColor/>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}