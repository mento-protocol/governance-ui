import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from './footer.module.scss';
import classNames from "classnames";
import {DiscordIcon, GithubIcon, MentoLogoIcon, TwitterIcon} from "@components/_icons";
import Link from "next/link";


interface FooterProps extends BaseComponentProps {
}

export const Footer = ({className, children, style}: FooterProps) => {

    const year = (new Date()).getFullYear();

    return (
        <footer className={classNames(styles.footer, className)} style={style}>
            <div className={classNames(styles.footer__element)}>
                <MentoLogoIcon/>
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
                        <TwitterIcon />
                    </Link>
                    <Link href="#">
                        <DiscordIcon />
                    </Link>
                    <Link href="#">
                        <GithubIcon />
                    </Link>
                </div>
            </div>
        </footer>
    );
}