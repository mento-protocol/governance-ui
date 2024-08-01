import { Popover } from "@headlessui/react";
import { Calendar, CalendarProps } from "../calendar/calendar.component";
import React from "react";
import { cn } from "@/styles/helpers";

type DatePickerProps = CalendarProps & {
  selected?: Date | null;
  onDayClick: (date: Date) => void;
  closeOnSelect?: boolean;
  children: React.ReactNode; // Changed to ReactNode to allow multiple children
};

interface DatePickerButtonProps {
  children: React.ReactNode;
  className?: string;
}

interface DatePickerPanelProps {
  children: React.ReactNode;
  className?: string;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  children,
  className,
}) => {
  return (
    <Popover.Button
      className={cn(
        "w-full rounded-[4px] border border-gray-light p-1 text-left",
        className,
      )}
    >
      {children}
    </Popover.Button>
  );
};

const DatePickerPanel: React.FC<DatePickerPanelProps> = ({
  children,
  className,
}) => {
  return <div className={cn("mt-2", className)}>{children}</div>;
};

export const DatePicker: React.FC<DatePickerProps> & {
  Button: typeof DatePickerButton;
  Panel: typeof DatePickerPanel;
} = ({ onDayClick, children, closeOnSelect = true, ...restProps }) => {
  const buttonChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DatePickerButton,
  );
  const panelChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === DatePickerPanel,
  );

  if (!buttonChild || !React.isValidElement(buttonChild)) {
    throw new Error("DatePicker must have a DatePicker.Button as a child");
  }

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          {buttonChild}
          <Popover.Panel className="absolute z-10 rounded-[4px] border border-gray-light bg-white dark:bg-black-off">
            <Calendar
              {...restProps}
              onDayClick={(date: Date) => {
                if (closeOnSelect) close();
                onDayClick(date);
              }}
            />
            {panelChild}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

DatePicker.Button = DatePickerButton;
DatePicker.Panel = DatePickerPanel;
