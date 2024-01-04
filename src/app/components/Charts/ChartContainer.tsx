export default function ChartContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col justify-center items-center bg-white p-3 rounded-lg  h-96">
            {children}
        </div>
    );
}
