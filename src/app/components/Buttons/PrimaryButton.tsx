export default function PrimaryButton({
    type,
    className,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={type}
            className={`px-3 py-2 text-center text-white text-md font-semibold rounded-md bg-boneDark hover:bg-boneDarker ${
                className ?? ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
}
