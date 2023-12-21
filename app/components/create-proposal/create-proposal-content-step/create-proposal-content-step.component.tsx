import {Input, MarkdownEditor} from "@components/_shared";
import {InferType, object, setLocale, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Wrapper from "@components/create-proposal/wrapper/wrapper.component";
import {CreateProposalFormStepEnum} from "@interfaces/create-proposal.interface";
import {useCreateProposalContext} from "@/app/providers/create-proposal.provider";

const validationSchema = object({
    title: string().required().typeError('Invalid title'),
    content: string().required().typeError('Invalid description')
});

type FormData = InferType<typeof validationSchema>

const formStep = CreateProposalFormStepEnum.content


export const CreateProposalContentStep = () => {

    const {form} = useCreateProposalContext();

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

    return <Wrapper isOpened={form[formStep].isOpened} step={formStep} title="Add name and description">
        <div>
            <p className="text-lg mb-4 ml-10">Give your proposal a title and a description. They will be public when
                your proposal goes live.</p>
            <Input label="Title"
                   type="text"
                   form={{...register('title')}}
                   id="proposal-title"
                   placeholder="Enter a title for your proposal"/>
            <MarkdownEditor
                    className="mt-4"
                    label="Description"
                    form={{...register('content')}}
                    id="proposal-description"
            />
        </div>
    </Wrapper>
}