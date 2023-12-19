type TextAreaProps = {
    className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextArea({
    className,
    children,
    ...props
}: TextAreaProps) {
    return (
        <textarea
            className={`w-full border border-black/30 rounded-md outline-none p-2 ${
                className ?? ""
            }`}
            {...props}
        ></textarea>
    );
}
