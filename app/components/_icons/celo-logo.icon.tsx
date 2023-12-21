import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from '@styles/exports.module.scss';
import classNames from "classnames";

export const CeloLogoIcon = ({
    width = 23,
    height = 23,
    color = exports.black,
    backgroundColor = "#FCFF52"
}: BaseIconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" width={width}
        height={height} viewBox="0 0 23 23" fill="none">
        <g clip-path="url(#clip0_5629_3299)">
            <path d="M11.832 22.2246C17.9072 22.2246 22.832 17.2997 22.832 11.2246C22.832 5.14948 17.9072 0.224609 11.832 0.224609C5.7569 0.224609 0.832031 5.14948 0.832031 11.2246C0.832031 17.2997 5.7569 22.2246 11.832 22.2246Z" fill={backgroundColor} />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9854 5.03125H5.67773V17.419H17.9863V13.0947H15.9438C15.2398 14.6725 13.6549 15.7708 11.8413 15.7708C9.34117 15.7708 7.31629 13.7151 7.31629 11.2168C7.31629 8.71757 9.34117 6.67949 11.8413 6.67949C13.6901 6.67949 15.275 7.81381 15.979 9.42597H17.9863V5.03125H17.9854Z" fill={color} />
        </g>
        <defs>
            <clipPath id="clip0_5629_3299">
                <rect width="22" height="22" fill="red" transform="translate(0.832031 0.224609)" />
            </clipPath>
        </defs>
    </svg>
}