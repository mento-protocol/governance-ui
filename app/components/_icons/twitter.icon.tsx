import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from '@styles/exports.module.scss';

export const TwitterIcon = ({width = 20, height = 16, color = exports.black}: BaseIconProps) => {

    return <svg width={width} height={height} viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M20 1.94888C19.2511 2.27399 18.4567 2.48739 17.6433 2.58199C18.4905 2.08438 19.1411 1.2964 19.4474 0.357526C18.642 0.825876 17.7608 1.15586 16.8419 1.33322C16.0934 0.551816 15.027 0.0634766 13.8468 0.0634766C11.5807 0.0634766 9.7434 1.86375 9.7434 4.08415C9.7434 4.39933 9.7798 4.70616 9.8497 5.00051C6.43953 4.83278 3.41609 3.23209 1.39227 0.799476C1.03914 1.39332 0.8368 2.08407 0.8368 2.82084C0.8368 4.21582 1.56125 5.44644 2.66219 6.16749C2.01059 6.14749 1.37332 5.97506 0.80359 5.66455C0.80336 5.68139 0.80336 5.69823 0.80336 5.71515C0.80336 7.66329 2.21773 9.28839 4.09477 9.65769C3.49054 9.81878 2.85674 9.84229 2.2418 9.72659C2.76391 11.324 4.2793 12.4865 6.07477 12.519C4.67047 13.5973 2.90117 14.2402 0.97883 14.2402C0.64758 14.2402 0.32102 14.2211 0 14.184C1.81586 15.3248 3.97266 15.9905 6.28984 15.9905C13.8373 15.9905 17.9644 9.86368 17.9644 4.55044C17.9644 4.37605 17.9605 4.20266 17.9525 4.03025C18.7558 3.46121 19.4492 2.75639 20 1.94888Z"
            fill={color}/>
    </svg>;

}