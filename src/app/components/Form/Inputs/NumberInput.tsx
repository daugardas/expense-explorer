import DefaultInput from "./DefaultInput";

type NumberInputProps = {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function NumberInput({
    className,
    onChange,
    ...props
}: NumberInputProps) {
    return (
        <DefaultInput
            type="text"
            className={` ${className ?? ""}`}
            onChange={(e) => {
                const re = /^-?\d*([.,]\d*)?$/;
                if (e.target.value === "" || re.test(e.target.value)) {
                    if (onChange) {
                        onChange(e);
                    }
                }
            }}
            {...props}
        ></DefaultInput>
    );
}
