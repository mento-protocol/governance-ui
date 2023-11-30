import {Card, Input, StepCounter} from "@components/_shared";
import {date, InferType, number, object, setLocale, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = object({
    title: string().required().typeError('Invalid title'),
    content: string().required().typeError('Invalid description')
});

type FormData = InferType<typeof validationSchema>

export const CreateProposalContentStep = () => {

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

    setLocale({
        mixed: {
            default: 'Value is required',
        },
    });

    return <Card block>
        <Card.Header>
            <div className="flex gap-4 items-center">
                <StepCounter isCard>2</StepCounter>
                Add name and description
            </div>
        </Card.Header>
        <div>
            <p className="text-lg mb-4 ml-10">Give your proposal a title and a description. They will be public when your proposal goes live.</p>
            <Input label="Proposal title"
                   type="text"
                   form={{...register('title')}}
                   id="proposal-title"
                   placeholder="Enter a title for your proposal" />
        </div>
    </Card>
}