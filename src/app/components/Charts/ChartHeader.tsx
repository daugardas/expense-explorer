export default function ChartHeader({
    children,
}: {
    children: React.ReactNode;
}) {
    return <h2 className="text-lg text-gray-600 font-bold">{children}</h2>;
}
