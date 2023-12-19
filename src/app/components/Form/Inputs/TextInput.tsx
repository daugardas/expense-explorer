import DefaultInput from "./DefaultInput";

type TextInputProps = {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ className, ...props }: TextInputProps) {
    return (
        <DefaultInput
            type="text"
            className={` ${className ?? ""}`}
            {...props}
        ></DefaultInput>
    );
}
