import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from '@styles/exports.module.scss';
import classNames from "classnames";

export const TwitterIcon = ({
    width = 41,
    height = 41,
    color = exports.black,
    useThemeColor = true,
    className,
    style
}: BaseIconProps) => {

    return <svg className={classNames(useThemeColor ? 'branded-icon' : '', className)} style={style} width={width}
        height={height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 41" fill="none">
        <rect width="40" height="40" transform="translate(0.458984 0.960938)" fill="none" />
        <path d="M10.5077 11.6016L18.2295 21.9263L10.459 30.3208H12.2078L19.0109 22.9713L24.5076 30.3208H30.459L22.3027 19.4153L29.5355 11.6016H27.7867L21.5214 18.3703L16.4591 11.6016H10.5077ZM13.0795 12.8898H15.8136L27.8868 29.0324H25.1527L13.0795 12.8898Z" fill={color} />
    </svg>

}