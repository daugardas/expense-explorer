export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-w-full min-h-full grid grid-cols-[0.3fr_1fr] p-5">
            {children}
        </div>
    );
}
