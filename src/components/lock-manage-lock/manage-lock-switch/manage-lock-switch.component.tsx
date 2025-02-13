import React from "react";
import { Switch } from "@headlessui/react";
import { cn } from "@mento-protocol/ui-toolkit";

interface ManageLockSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const ManageLockSwitch: React.FC<ManageLockSwitchProps> = ({
  checked,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className,
      )}
    >
      <label>Add additional MENTO</label>
      <Switch
        checked={checked}
        onChange={onChange}
        className={cn(
          checked ? "bg-mento-blue" : "bg-white",
          "relative inline-flex h-6 w-11 items-center rounded-full border border-black transition-colors",
        )}
      >
        <span
          className={cn(
            checked ? "translate-x-6" : "translate-x-1",
            "inline-block size-4 transform rounded-full bg-black transition-transform",
          )}
        />
      </Switch>
    </div>
  );
};
