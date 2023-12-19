type DefaultInputProps = {
    className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function DefaultInput({
    className,
    ...props
}: DefaultInputProps) {
    return (
        <input
            className={`w-full border border-black/30 rounded-md outline-none p-2 ${
                className ?? ""
            }`}
            {...props}
        ></input>
    );
}
