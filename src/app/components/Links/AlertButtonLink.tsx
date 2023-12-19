import Link from "next/link";

export default function AlertButtonLink({
    href,
    className,
    children,
}: {
    href: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={` block px-3 py-2 text-center h-10 text-white text-md font-semibold rounded-md bg-yellow-500 hover:bg-yellow-600 ${
                className ?? ""
            }`}
        >
            {children}
        </Link>
    );
}
