"use client";

import Link from "next/link";
import DashboardIcon from "./Icons/DashboardIcon";
import CategoriesIcon from "./Icons/CategoriesIcon";
import AccountsIcon from "./Icons/AccountsIcon";
import TransactionsIcon from "./Icons/TransactionsIcon";
import { usePathname } from "next/navigation";

function NavLink({
    href,
    currentPath,
    children,
    icon,
}: Readonly<{
    href: string;
    currentPath: string;
    children: React.ReactNode;
    icon: React.ReactNode;
}>) {
    return (
        <Link
            className={`p-2 hover:bg-raisinBlackLight flex w-full gap-4 rounded-md text-xl text-white ${
                currentPath.includes(href) ? "bg-raisinBlackLight" : ""
            }`}
            href={href}
        >
            {icon}
            {children}
        </Link>
    );
}

export default function Nav() {
    const pathname = usePathname();

    return (
        <nav className="min-h-screen p-3 flex flex-col flex-auto bg-raisinBlackDarkest">
            <h1 className="text-3xl text-white text-center mb-10">
                Expense explorer
            </h1>
            <NavLink
                href={"/transactions"}
                currentPath={pathname}
                icon={<TransactionsIcon />}
            >
                Transactions
            </NavLink>
            <NavLink
                href={"/accounts"}
                currentPath={pathname}
                icon={<AccountsIcon />}
            >
                Accounts
            </NavLink>
            <NavLink
                href={"/categories"}
                currentPath={pathname}
                icon={<CategoriesIcon />}
            >
                Categories
            </NavLink>
            <NavLink
                href={"/dashboard"}
                currentPath={pathname}
                icon={<DashboardIcon />}
            >
                Dashboard
            </NavLink>
        </nav>
    );
}
