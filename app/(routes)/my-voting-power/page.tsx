"use client";
import {Button, Card, DatePicker, Input, MntoLock, Slider} from "@components/_shared";
import {LocksList} from "@components/locks-list/locks-list.component";
import {date, InferType, number, object, setLocale} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {
    addMonths,
    addYears,
    setISODay,
    addWeeks,
    addDays,
    differenceInWeeks,
    differenceInYears,
    startOfWeek,
    endOfWeek,
    nextWednesday,
    nextTuesday,
    differenceInMonths,
    differenceInCalendarWeeks, differenceInCalendarMonths,
} from "date-fns";

const Page = () => {

    return <main className="flex flex-col place-items-center">
        <h2 className="text-2xl mt-8 mb-4">My Voting Power</h2>
        <Card block>
            <div className="grid grid-cols-1 md:grid-cols-2 min-w-full gap-default-x3">
                <MntoLock/>
                <div>
                    TODO: Chart
                </div>
            </div>
        </Card>
        <h2 className="text-2xl mt-8 mb-4">My Locks</h2>
        <Card block>
            <LocksList/>
        </Card>
    </main>
}

export default Page;