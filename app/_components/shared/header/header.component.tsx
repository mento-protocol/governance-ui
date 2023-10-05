import styles from './header.module.scss';
import classNames from "classnames";
import {MentoLogoIcon} from "@components/icons";

export const Header = () => {
    return <header className={classNames(styles.header)}>
        <div className={classNames(styles.header__inner)}>
            <div className={classNames(styles.header__logo)}>
                <MentoLogoIcon/>
            </div>
        </div>
    </header>
}
