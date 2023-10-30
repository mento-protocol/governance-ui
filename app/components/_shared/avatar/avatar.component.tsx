import styles from "./avatar.module.scss";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";

interface AvatarProps extends BaseComponentProps {
    src?: string;
    alt?: string;
}

export const Avatar = ({className, style, src, alt}: AvatarProps) => {
    return <div className={classNames(styles.avatar, className)} style={style}>
        {src && alt && <img src={src} alt={alt}/>}
        {(!src || !alt) && <div className={styles.avatarPlaceholder}/> }
    </div>

}