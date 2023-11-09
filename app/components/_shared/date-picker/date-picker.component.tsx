import 'react-day-picker/dist/style.css';
import styles from './date-picker.module.scss';
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {DayPicker, SelectSingleEventHandler} from "react-day-picker";
import classNames from "classnames";
import {ReactNode, useRef, useState} from "react";
import useOutsideAlerter from "@/app/hooks/useOutsideAlerter";

interface DatePickerProps extends BaseComponentProps {
    id?: string;
    label?: string;
    error?: string;
    placeholder?: string;
    form: any;
    compact?: boolean;
    addon?: ReactNode;
    minDate?: Date;
    maxDate?: Date;
}

export const DatePicker = ({
                               id,
                               label,
                               error,
                               placeholder,
                               form,
                               minDate,
                               maxDate,
                               compact,
                               className,
                               style
                           }: DatePickerProps) => {

    const datePicker = useRef(null);
    useOutsideAlerter(datePicker, () => {
        setDatePickerOpened(false);
    });

    const [selectedDate, setSelectedDate] = useState(undefined as Date | undefined);
    const idInternal = id || Math.floor(Math.random() * 1000).toString();
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    const handleDayClick: SelectSingleEventHandler = (date) => {
        console.log(date);
        setSelectedDate(date);
        setDatePickerOpened(false);
    };

    return <div className={classNames(styles.datePicker, compact && styles.compact, className)} style={style}>

        {!!label && <label htmlFor={idInternal}>
            {label}
        </label>}
        <div className={classNames(styles.input, datePickerOpened && styles.focused, !!error && styles.error)} onClick={() => setDatePickerOpened(true)}>
            <div id={idInternal}>
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
                        defaultMonth={minDate}
                        numberOfMonths={1}
                        showOutsideDays
                        fixedWeeks
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