export default function GridTile({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`flex flex-col justify-center items-center bg-white p-3 rounded-lg ${className}`}
        >
            {children}
        </div>
    );
}
