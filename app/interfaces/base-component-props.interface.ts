import {CSSProperties, ReactNode} from "react";

export default interface BaseComponentProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}