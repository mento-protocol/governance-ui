import 'react-day-picker/dist/style.css';
import styles from './date-picker.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {DayPicker, SelectSingleEventHandler} from "react-day-picker";
import classNames from "classnames";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";
import BaseInputProps from "@interfaces/base-input-props.interface";
import {format, isAfter, isBefore} from "date-fns";
import addDays from "date-fns/addDays";

type DisallowedDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface DatePickerProps extends BaseComponentProps {
    compact?: boolean;
    addon?: ReactNode;
    minDate?: Date;
    calendarStartDate?: Date;
    maxDate?: Date;
    value?: Date;
    disallowedDays?: DisallowedDay[];
    id?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    onChange?: (date: Date) => void;
}

const dayToNumberMap: Record<DisallowedDay, number> = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
}

export const DatePicker = ({
                               id,
                               label,
                               error,
                               placeholder,
                               minDate,
                               maxDate,
                               compact,
                               className,
                               style,
                               disallowedDays,
                               onChange,
                               value,
                               calendarStartDate
                           }: DatePickerProps) => {


    const datePicker = useRef(null);
    useOutsideAlerter(datePicker, () => {
        setDatePickerOpened(false);
    });

    const [selectedDate, setSelectedDate] = useState(value);
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    useEffect(() => {
        setSelectedDate(value);
    }, [value]);


    const disabledDays = useMemo(() => {
        if (!minDate || !maxDate) return [];

        const disallowedDaysMapped = (disallowedDays || []).map(day => dayToNumberMap[day]);

        let current = minDate;
        const disabledDays = [];

        while (isBefore(current, maxDate)) {
            if (disallowedDaysMapped?.includes(current.getDay())) {
                disabledDays.push(current);
            }
            current = addDays(current, 1);
        }

        return disabledDays;
    }, [minDate, maxDate, disallowedDays]);

    const handleDayClick: SelectSingleEventHandler = (date) => {
        setSelectedDate(date);
        setDatePickerOpened(false);

        onChange && onChange(date!);
    };

    return <div className={classNames(styles.datePicker, compact && styles.compact, className)} style={style}>

        {!!label && <label htmlFor={id}>
            {label}
        </label>}
        <div className={classNames(styles.input, datePickerOpened && styles.focused, !!error && styles.error)}
             onClick={() => setDatePickerOpened(true)}>
            <div id={id}>
                {!selectedDate && <div className={styles.placeholder}>{placeholder}</div>}
                {!!selectedDate && <div className={styles.selectedDate}>{selectedDate.toLocaleDateString()}</div>}
            </div>
        </div>
        {!!error && <div className={styles.errorMessage}>{error}</div>}

        <div className={classNames(styles.backdrop, datePickerOpened && styles.opened)}>
            <div ref={datePicker} className={classNames(styles.pickerDropdown)}>
                <div className={styles.inner}>
                    <DayPicker
                        mode="single"
                        fromDate={minDate}
                        selected={selectedDate}
                        toDate={maxDate}
                        defaultMonth={calendarStartDate || minDate}
                        numberOfMonths={1}
                        showOutsideDays
                        fixedWeeks
                        disabled={disabledDays}
                        modifiersClassNames={{
                            selected: styles.selected,
                        }}
                        onSelect={handleDayClick}
                    />
                </div>
            </div>
        </div>
    </div>
}