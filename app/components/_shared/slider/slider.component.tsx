import styles from './slider.module.scss';
import exports from '@styles/exports.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import {ReactNode, useEffect, useMemo, useState} from "react";
import BaseInputProps from "@interfaces/base-input-props.interface";

interface SliderProps extends BaseComponentProps, BaseInputProps {
    compact?: boolean;
    min?: number;
    max?: number;
    step?: number;
    minLabel?: ReactNode | string;
    maxLabel?: ReactNode | string;
    bubbleFormatter?: (value: number) => ReactNode | string;
    changeCallback?: (date: number | string) => void;
}

export const Slider = ({
                           label,
                           id,
                           className,
                           form,
                           error,
                           compact,
                           min,
                           max,
                           step,
                           minLabel,
                           maxLabel,
                           bubbleFormatter,
                           value,
                           changeCallback
                       }: SliderProps) => {
    const {onBlur, onChange, ref, name} = form;
    const [currentValue, setCurrentValue] = useState(min || value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const activeBackground = useMemo(() => {
        const progress = Math.floor(currentValue / (max || 100) * 100);
        return `linear-gradient(90deg, ${exports.secondary} ${progress}%, transparent ${progress}%)`;
    }, [currentValue, max]);

    const bubblePosition = useMemo(() => {
        const progress = Math.floor(currentValue / (max || 100) * 100);
        return `calc(${progress - ((100 - progress) / 100)}% - ${(progress * 44 / 100)}px)`;
    }, [currentValue, max]);

    const onValueChange = (event: any) => {
        setCurrentValue(event.target.value);
        changeCallback && changeCallback(event.target.value);
        onChange(event);
    }

    return <div className={classNames(styles.sliderWrapper, compact && styles.compact, className)}>
        {!!label && <label htmlFor={id}>
            {label}
        </label>}
        <div className={styles.bubbleTrack}>
            <div className={styles.bubble} style={{left: bubblePosition}}>
                {bubbleFormatter ? bubbleFormatter(currentValue) : currentValue}
            </div>
        </div>
        <div className={styles.labels}>
            <div>
                {minLabel}
            </div>
            <div>{maxLabel}</div>
        </div>
        <input id={id}
               step={step}
               className={classNames(styles.slider)}
               onChange={onValueChange}
               onBlur={onBlur}
               ref={ref}
               name={name}
               value={currentValue}
               style={{background: activeBackground}}
               min={min}
               max={max}
               type={'range'}/>
        {!!error && <div className={styles.errorMessage}>{error}</div>}
    </div>
}