import { Popover } from "@headlessui/react";
import { Calendar, CalendarProps } from "../calendar/calendar.component";
import { format, isToday } from "date-fns";

export function DatePicker(
  props: CalendarProps & {
    selected?: Date | null;
    onDayClick: (date: Date) => void;
  },
) {
  return (
    <Popover className="relative">
      {({ open, close }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button className="w-full rounded-[4px] border border-gray-light p-1 text-left">
            {props.selected && !isToday(props.selected)
              ? format(props?.selected, "PPP")
              : "Select a date"}
          </Popover.Button>

          <Popover.Panel className="absolute z-10 rounded-[4px] border border-gray-light bg-white dark:bg-black-off">
            <Calendar
              {...props}
              onDayClick={(date: Date) => {
                close();
                props?.onDayClick(date);
              }}
            />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
