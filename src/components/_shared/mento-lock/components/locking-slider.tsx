import { Controller, useFormContext } from "react-hook-form";

import { Slider } from "@/components/_shared/slider/slider.component";
import {
  LOCKING_DURATION_FORM_KEY,
  MAX_LOCKING_DURATION_WEEKS,
} from "@/lib/constants/locking";

export const LockingSlider = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <Slider
          labels={{
            min: `1 week`,
            current: <CurrentValueLabel value={value} />,
            max: "2 Years",
          }}
          onValueChange={([val]) => {
            onChange(val);
          }}
          value={[value]}
          max={MAX_LOCKING_DURATION_WEEKS}
          step={1}
          min={1}
        />
      )}
      name={LOCKING_DURATION_FORM_KEY}
    />
  );
};
const CurrentValueLabel = ({ value }: { value: number }) => {
  return <>{`${value} weeks`}</>;
};
