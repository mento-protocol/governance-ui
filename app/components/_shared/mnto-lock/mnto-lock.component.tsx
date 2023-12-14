import BaseComponentProps from "@interfaces/base-component-props.interface";
import {Button, DatePicker, Input, Slider} from "@components/_shared";
import {
    addMonths,
    addYears,
    differenceInMonths,
    differenceInYears,
    nextWednesday,
    setISODay
} from "date-fns";
import {date, InferType, number, object, setLocale} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

interface MntoLockProps extends BaseComponentProps {
    onLockCallback?: () => void;
}

const validationSchema = object({
    toLock: number().required().typeError('Invalid number').max(400000),
    expiration: date().required().typeError('Invalid Date').min(addYears(new Date(), 1)).max(addYears(new Date(), 4)),
    expirationMonths: number().required().typeError('Invalid number').max(4 * 52)
});

type FormData = InferType<typeof validationSchema>

export const MntoLock = ({className, style, onLockCallback}: MntoLockProps ) => {

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

    const getMonths = () => {
        const years = differenceInYears(getValues('expiration'), setISODay(new Date(), 3));
        const months = differenceInMonths(getValues('expiration'), setISODay(addYears(new Date(), years), 3));
        return months > 0 && `${months} ${months > 1 ? 'months' : 'month'}`;
    }

    const getYears = () => {
        const years = differenceInYears(getValues('expiration'), setISODay(new Date(), 3));
        return years > 0 && `${years} ${years > 1 ? 'years' : 'year'}`
    }

    const dateSelected = (date: Date) => {
        setValue('expiration', date);
        setValue('expirationMonths', differenceInMonths(date, setISODay(new Date(), 3)));
        console.log([
            getYears(),
            getMonths()
        ].filter(Boolean).join(' '));
    }

    const performLock = () => {
        if (isValid) {
            onLockCallback && onLockCallback();
        }
    }

    const monthSelected = (months: number | string) => {
        const newDate = nextWednesday(addMonths(new Date(), +months));
        setValue('expiration', newDate);
        setValue('expirationMonths', +months);
    }

    return <div className={className} style={style}>
        <div className="flex flex-col lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
            <div className="text-lg flex-1 whitespace-nowrap">
                MNTO to lock:
            </div>
            <div className="flex-1">
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

        <div className="flex flex-col lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
            <div className="text-lg flex-1 whitespace-nowrap">
                Lock expires:
            </div>
            <div className="flex-1">
                <DatePicker id="expiration"
                            compact
                            disallowedDays={['mon', 'tue', 'thu', 'fri', 'sat', 'sun']}
                            minDate={nextWednesday(addMonths(new Date(), 1))}
                            maxDate={nextWednesday(addYears(new Date(), 4))}
                            calendarStartDate={new Date()}
                            placeholder="Lock expires"
                            value={watch('expiration')}
                            onChange={(date) => dateSelected(date)}
                            error={errors.expiration?.message}/>
            </div>
        </div>

        <div className="flex flex-col mt-[30px] lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
            <div className="text-lg flex-1 whitespace-nowrap">
                You recieve veMENTO:
            </div>
            <div className="flex-1">
                <strong>{(400000).toLocaleString()}</strong>
            </div>
        </div>

        <Slider id={'expirationMonths'} min={1}
                minLabel={`1 month`}
                max={48}
                maxLabel={`4 years`}
                step={1}
                value={watch('expirationMonths')}
                bubbleFormatter={(value) => {
                    return [
                        getYears(),
                        getMonths()
                    ].filter(Boolean).join(' ');
                }}
                changeCallback={(value) => monthSelected(value)}
                form={{
                    ...register('expirationMonths', {
                        value: 1
                    })
                }}/>
        <Button block className="!mt-[30px]" onClick={handleSubmit(performLock)}>
            Lock MNTO
        </Button>
    </div>
}