export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-w-full min-h-full grid grid-cols-8 gap-4 p-5">
            {children}
        </div>
    );
}
