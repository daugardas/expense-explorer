export default function SecondaryButton({
    type,
    className,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={type}
            className={`px-3 py-2 text-center text-white text-md font-semibold rounded-md bg-gray-300 hover:bg-gray-400 ${
                className ?? ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
}
