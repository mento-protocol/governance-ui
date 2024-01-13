"use client";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProposalFormStepEnum } from "@interfaces/create-proposal.interface";
import { useForm } from "react-hook-form";
import { InferType, object, setLocale, string } from "yup";
import { Textarea } from "@components/_shared";
import { useCreateProposalStore } from "@/app/store";

const validationSchema = object({
    code: string().required().typeError("Invalid code"),
});

type FormData = InferType<typeof validationSchema>;

const formStep = CreateProposalFormStepEnum.execution;

export const CreateProposalExecutionStep = () => {
    const { form } = useCreateProposalStore();

    const {
        register,
        watch,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });

    setLocale({
        mixed: {
            default: "Value is required",
        },
    });

    return (
        <Wrapper step={formStep} title="Execution Code">
            <div>
                <p className="font-size-x4 line-height-x5 ml-x7">
                    Paste your governance proposal’s execution code in the json format in the field below:
                </p>
                <Textarea
                    className="mt-x5 mb-x5 min-h-[266px]"
                    form={{ ...register("code") }}
                    id="proposal-execution"
                    error={errors.code?.message}
                    placeholder="Paste your code here"
                />
            </div>
        </Wrapper>
    );
};
