type SelectProps = {
    className?: string;
    children: React.ReactNode;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className, children, ...props }: SelectProps) {
    return (
        <select
            className={`w-full p-2 bg-white border border-black/30 rounded-md outline-none ${
                className ?? ""
            }`}
            {...props}
        >
            {children}
        </select>
    );
}
