export default interface BaseInputProps {
    id: string;
    form: FormProps;
    label?: string;
    placeholder?: string;
    error?: string;
    value?: any;
    disabled?: boolean;
}

interface FormProps {
    onChange: (event: any) => void;
    onBlur: (event: any) => void;
    name: string;
    ref: any;
}