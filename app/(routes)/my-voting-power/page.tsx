"use client";
import {Card, DatePicker, Input} from "@components/_shared";
import {LocksList} from "@components/locks-list/locks-list.component";
import {date, InferType, number, object, setLocale} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addMonths, addYears} from "date-fns";

const validationSchema = object({
    toLock: number().required().typeError('Invalid number').max(400000),
    expiration: date().required().typeError('Invalid Date').min(addYears(new Date(), 1)).max(addYears(new Date(), 4))
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

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onChange'
    });

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
                                        minDate={addMonths(new Date(), 1)}
                                        maxDate={addYears(new Date(), 4)}
                                        placeholder="Voting power"
                                        form={{...register('expiration')}}
                                        error={errors.expiration?.message}/>
                        </div>
                    </div>
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