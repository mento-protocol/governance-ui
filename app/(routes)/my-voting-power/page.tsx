"use client";
import {Card, DatePicker, Input, Slider} from "@components/_shared";
import {LocksList} from "@components/locks-list/locks-list.component";
import {date, InferType, number, object, setLocale} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    addMonths,
    addYears,
    setISODay,
    addWeeks,
    differenceInWeeks,
    nextWednesday,
} from "date-fns";
import {useEffect, useMemo} from "react";

const validationSchema = object({
    toLock: number().required().typeError('Invalid number').max(400000),
    expiration: date().required().typeError('Invalid Date').min(addYears(new Date(), 1)).max(addYears(new Date(), 4)),
    expirationWeeks: number().required().typeError('Invalid number').max(4 * 52)
});
type FormData = InferType<typeof validationSchema>

const Page = () => {

    setLocale({
        mixed: {
            default: 'Invalid number',
        },
        number: {
            max: ({max}) => (`Must not exceed ${max}`),
        },
        date: {
            max: ({max}) => (`Cannot lock for more than 4 years`),
            min: ({min}) => (`Cannot lock for less than 1 year`),
        }
    });

    const {
        register,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: {errors, isValid}
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

    const getWeeks = (weeks: number) => {
        console.log('getWeeks', weeks, weeks % 4);
        weeks = weeks % 4;
        return weeks > 0 && `${weeks} weeks`;
    }

    const getMonths = (weeks: number) => {
        console.log('getMonths', weeks, Math.floor(weeks / 4), Math.floor(weeks / 4) % 12);
        const months = Math.floor(weeks / 4) % 12;
        return months > 0 && `${months} months`;
    }

    const getYears = (weeks: number) => {
        console.log('getYears', weeks, Math.floor(weeks / 52));
        const years = Math.floor(weeks / 52);
        return years > 0 && `${years} years`;
    }

    useEffect(() => {
        return;
        // watch((value, {name}) => {
        //     switch (name) {
        //         case 'expirationWeeks':
        //             const newDate = nextWednesday(addWeeks(new Date(), +(value['expirationWeeks'] || 0)));
        //             if (value['expiration'] !== newDate) {
        //                 setValue('expiration', newDate);
        //             }
        //             break;
        //         case 'expiration':
        //             const weeks = Math.floor(differenceInWeeks(value['expiration']!, setISODay(new Date(), 2)));
        //             if (value['expirationWeeks'] !== weeks) {
        //                 setValue('expirationWeeks', weeks);
        //             }
        //             break;
        //     }
        // });
    }, []);

    const dateSelected = (date: Date) => {
        const weeks = Math.floor(differenceInWeeks(date, setISODay(new Date(), 2)));
        setValue('expiration', date);
        setValue('expirationWeeks', weeks);
    }

    const weekSelected = (weeks: number | string) => {
        const newDate = setISODay(addWeeks(new Date(), +(weeks || 0)), 3);
        setValue('expiration', newDate);
        setValue('expirationWeeks', +weeks);
    }

    return <main className="flex flex-col place-items-center">
        <h2 className="text-xl font-semibold mt-8 mb-4">My Voting Power</h2>
        <Card block>
            <div className="grid grid-cols-1 md:grid-cols-2 min-w-full gap-default-x3">
                <div>
                    <div className="flex flex-col lg:flex-row justify-between gap-1 md:gap-5">
                        <div className="text-2xl flex-0 whitespace-nowrap">
                            MNTO to lock:
                        </div>
                        <div className="flex-1 md:basis-56 md:max-w-xs">
                            <Input id="toLock"
                                   type="number"
                                   compact
                                   placeholder="Voting power"
                                   form={{...register('toLock')}}
                                   error={errors.toLock?.message}
                                   addon={<div className="text-xs opacity-50">
                                       <div className="flex justify-between gap-3">
                                           <div className="whitespace-nowrap">Max available</div>
                                           <div className="whitespace-nowrap">400 000 MENT</div>
                                       </div>
                                   </div>}/>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between gap-1 md:gap-5">
                        <div className="text-2xl flex-0 whitespace-nowrap">
                            Expiry date:
                        </div>
                        <div className="flex-1 md:basis-56 md:max-w-xs">
                            <DatePicker id="expiration"
                                        compact
                                        disallowedDays={['mon', 'tue', 'thu', 'fri', 'sat', 'sun']}
                                        minDate={setISODay(addMonths(new Date(), 1), 3)}
                                        maxDate={addYears(new Date(), 4)}
                                        calendarStartDate={new Date()}
                                        placeholder="Voting power"
                                        value={watch('expiration')}
                                        onChange={(date) => dateSelected(date)}
                                        error={errors.expiration?.message}/>
                        </div>
                    </div>

                    <Slider id={'expirationWeeks'} min={4}
                            minLabel={`1 month`}
                            max={209}
                            maxLabel={`4 years`}
                            step={4}
                            value={watch('expirationWeeks')}
                            bubbleFormatter={(value) => {
                                return [
                                    getYears(value),
                                    getMonths(value),
                                    getWeeks(value)
                                ].filter(Boolean).join(' ');
                            }}
                            changeCallback={(value) => weekSelected(value)}
                            form={{
                                ...register('expirationWeeks', {
                                    value: 4
                                })
                            }}/>
                </div>
                <div>
                    TODO: Chart
                </div>
            </div>
        </Card>
        <h2 className="text-xl font-semibold mt-8 mb-4">My Locks</h2>
        <Card block>
            <LocksList/>
        </Card>
    </main>
}

export default Page;