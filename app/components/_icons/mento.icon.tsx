import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from '@styles/exports.module.scss';

interface MentoIconProps extends BaseIconProps {
    backgroundColor?: string;
}

export const MentoIcon = ({
                              width = 60,
                              height = 60,
                              color = exports.black,
                              backgroundColor = exports.success,
                              className,
                              style
                          }: MentoIconProps) => {
    return <svg className={className} style={style} width={width} height={height} viewBox="0 0 63 63" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <circle cx="31.4336" cy="31.5796" r="31.1016" fill={backgroundColor}/>
        <path
            d="M41.162 41.2452V51.5796H26.1765C17.7169 51.5796 11.4326 45.5006 11.4326 36.9899L11.4326 21.9139H21.705V34.5583C21.705 38.8136 24.3637 41.2452 28.5935 41.2452H41.162ZM21.705 21.9139V11.5796L36.6905 11.5796C45.1501 11.5796 51.4344 17.6586 51.4344 26.1693V41.2452H41.162V28.6009C41.162 24.3455 38.5033 21.9139 34.2735 21.9139H21.705Z"
            fill={color}/>
    </svg>

}