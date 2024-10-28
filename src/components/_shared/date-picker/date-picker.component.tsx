import { Popover } from "@headlessui/react";
import { Calendar, CalendarProps } from "../calendar/calendar.component";
import React from "react";
import { cn } from "@/styles/helpers";

type DatePickerProps = CalendarProps & {
  selected?: Date | null;
  onDayClick: (date: Date) => void;
  closeOnSelect?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};

interface DatePickerButtonProps {
  children: React.ReactNode;
  className?: string;
  closeButtonRef?: React.RefObject<HTMLButtonElement>;
}

interface DatePickerPanelProps {
  children: React.ReactNode;
  className?: string;
}

const DatePickerButton: React.FC<DatePickerButtonProps> = ({
  children,
  className,
  closeButtonRef,
}) => {
  return (
    <Popover.Button
      ref={closeButtonRef}
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
  className?: string;
} = ({
  onDayClick,
  children,
  className,
  closeOnSelect = true,
  onClose,
  ...restProps
}) => {
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
    <Popover onAbort={onClose} className={cn(className, "relative h-full")}>
      {({ close }) => (
        <>
          {buttonChild}
          <Popover.Panel className="absolute right-0 z-10 flex w-[300px] flex-col items-center rounded-[4px] border border-gray-light bg-white dark:bg-black-off">
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
