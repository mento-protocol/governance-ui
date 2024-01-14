import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button, DatePicker, Input, Slider } from "@components/_shared";
import {
  addMonths,
  addYears,
  differenceInMonths,
  differenceInYears,
  nextWednesday,
  setISODay,
} from "date-fns";
import { date, InferType, number, object, setLocale } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/app/store";
import { useEffect } from "react";
import { ILock } from "@interfaces/lock.interface";
import useModal from "@/app/providers/modal.provider";

interface MentoLockProps extends BaseComponentProps {}

let validationSchema = object({
  toLock: number().required().typeError("Invalid number").max(0),
  expiration: date()
    .required()
    .typeError("Invalid Date")
    .min(addYears(new Date(), 1))
    .max(addYears(new Date(), 4)),
  expirationMonths: number()
    .required()
    .typeError("Invalid number")
    .max(4 * 52),
});

type FormData = InferType<typeof validationSchema>;

export const MentoLock = ({ className, style }: MentoLockProps) => {
  const { walletAddress, balanceMENTO, lock } = useUserStore();
  const { showConfirm } = useModal();

  const patchValidationSchema = (value: number) => {
    validationSchema = object({
      toLock: number().required().typeError("Invalid number").max(value),
      expiration: date()
        .required()
        .typeError("Invalid Date")
        .min(addYears(new Date(), 1))
        .max(addYears(new Date(), 4)),
      expirationMonths: number()
        .required()
        .typeError("Invalid number")
        .max(4 * 52),
    });
  };

  useEffect(() => {
    patchValidationSchema(balanceMENTO);
  }, [balanceMENTO]);

  setLocale({
    mixed: {
      default: "Invalid number",
    },
    number: {
      max: ({ max }) => `Must not exceed ${max}`,
    },
    date: {
      max: ({ max }) => `Cannot lock for more than 4 years`,
      min: ({ min }) => `Cannot lock for less than 1 year`,
    },
  });

  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const getMonths = () => {
    const years = differenceInYears(
      getValues("expiration"),
      setISODay(new Date(), 3),
    );
    const months = differenceInMonths(
      getValues("expiration"),
      setISODay(addYears(new Date(), years), 3),
    );
    return months > 0 && `${months} ${months > 1 ? "months" : "month"}`;
  };

  const getYears = () => {
    const years = differenceInYears(
      getValues("expiration"),
      setISODay(new Date(), 3),
    );
    return years > 0 && `${years} ${years > 1 ? "years" : "year"}`;
  };

  const dateSelected = (date: Date) => {
    setValue("expiration", date);
    setValue(
      "expirationMonths",
      differenceInMonths(date, setISODay(new Date(), 3)),
    );
    trigger("expiration");
  };

  const performLock = () => {
    if (isValid) {
      showConfirm(
        `Do you want to lock ${getValues("toLock")} MENTO for ${[
          getYears(),
          getMonths(),
        ]
          .filter(Boolean)
          .join(" and ")}?`,
        {
          confirmText: "Lock",
          modalType: "info",
        },
      ).then((confirmed) => {
        if (confirmed) {
          lock({
            owner: walletAddress,
            amountMNTO: getValues("toLock"),
            amountsVeMNTO: Math.round(
              getValues("toLock") * 100 * (getValues("expirationMonths") / 12),
            ),
            expireDate: getValues("expiration"),
          } as ILock).then(() => {
            reset();
          });
        }
      });
    }
  };

  const monthSelected = (months: number | string) => {
    const newDate = nextWednesday(addMonths(new Date(), +months));
    setValue("expiration", newDate);
    setValue("expirationMonths", +months);
    trigger("expiration");
  };

  patchValidationSchema(balanceMENTO);

  return (
    <div className={className} style={style}>
      <div className="flex flex-col lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">MNTO to lock:</div>
        <div className="flex-1">
          <Input
            id="toLock"
            type="number"
            placeholder="Voting power"
            form={{ ...register("toLock") }}
            error={errors.toLock?.message}
            addon={
              <div className="text-xs opacity-50">
                <div className="flex justify-between gap-x3">
                  <div className="whitespace-nowrap">Max</div>
                  <div className="whitespace-nowrap">
                    {balanceMENTO.toLocaleString()} MENTO
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">Lock expires:</div>
        <div className="flex-1">
          <DatePicker
            id="expiration"
            className="w-full"
            disallowedDays={["mon", "tue", "thu", "fri", "sat", "sun"]}
            minDate={nextWednesday(addMonths(new Date(), 1))}
            maxDate={nextWednesday(addYears(new Date(), 4))}
            calendarStartDate={new Date()}
            placeholder="Lock expires"
            value={watch("expiration")}
            onChange={(date) => dateSelected(date)}
            addon={
              <div className="text-xs opacity-50">Between 1 and 4 years</div>
            }
            error={errors.expiration?.message}
          />
        </div>
      </div>

      <div className="flex flex-col mt-x6 lg:flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">
          You recieve veMENTO:
        </div>
        <div className="flex-1">
          <strong>
            {isValid
              ? Math.round(
                  watch("toLock") * 100 * (watch("expirationMonths") / 12),
                )
              : "¯\\_(ツ)_/¯"}
          </strong>
        </div>
      </div>

      <Slider
        id={"expirationMonths"}
        min={1}
        minLabel={`1 month`}
        max={48}
        maxLabel={`4 years`}
        step={1}
        value={watch("expirationMonths")}
        bubbleFormatter={(value) => {
          return [getYears(), getMonths()].filter(Boolean).join(" ");
        }}
        changeCallback={(value) => monthSelected(value)}
        form={{
          ...register("expirationMonths", {
            value: 1,
          }),
        }}
      />
      <Button
        block
        className="!mt-x6"
        onClick={handleSubmit(performLock)}
        disabled={!isValid}
      >
        Lock MENTO
      </Button>
    </div>
  );
};
