import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from '@styles/exports.module.scss';

export const CopyIcon = ({
    width = 24,
    height = 29,
    color = exports.lightGrey
}: BaseIconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={width}
        height={height} viewBox="0 0 24 29" fill="none">
        <path d="M15.6719 18.7832H19.9844V4.7832H8.48438V10.0332" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M15.6719 10.0332H4.17188V24.0332H15.6719V10.0332Z" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
}