export default function DangerButton({
    type,
    className,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={type}
            className={`block px-3 py-2 text-center h-10 text-white text-md font-semibold rounded-md bg-red-600 hover:bg-red-700 ${
                className ?? ""
            }`}
            {...props}
        >
            {children}
        </button>
    );
}
