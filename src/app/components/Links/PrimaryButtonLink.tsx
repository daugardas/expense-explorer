import Link from "next/link";

export default function PrimaryButtonLink({
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
            className={`px-3 py-2 text-center text-white text-md font-semibold rounded-md bg-boneDark hover:bg-boneDarker ${
                className ?? ""
            }`}
        >
            {children}
        </Link>
    );
}
