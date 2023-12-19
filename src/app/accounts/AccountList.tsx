import { Account } from "@prisma/client";
import Link from "next/link";
import prisma from "@/lib/db";
import PrimaryButtonLink from "../components/Links/PrimaryButtonLink";
import { redirect, usePathname } from "next/navigation";

function AccountEl({
    account,
    selected,
}: {
    account: Account;
    selected: boolean;
}) {
    return (
        <Link
            href={`/accounts/${account.id}`}
            className={`bg-white w-52 shadow-sm rounded-md p-2 hover:bg-isabelline min-w-full ${
                selected ? "!bg-boneDark !hover:bg-boneDark" : ""
            }`}
        >
            <h2>{account.name}</h2>
            <p className="break-words">{account.description}</p>
            <p>
                {account.balance} {account.currency}
            </p>
        </Link>
    );
}

export default async function AccountList({
    selectedId,
}: {
    selectedId?: string;
}) {
    const accounts = await prisma.account.findMany();

    return (
        <div className="px-5 flex flex-col items-center gap-2">
            <h1 className="text-2xl text-center min-w-full h-fit">Accounts</h1>

            <PrimaryButtonLink href={`/accounts/create`}>
                Create a new account
            </PrimaryButtonLink>
            {accounts.map((account) => (
                <AccountEl
                    key={account.id}
                    account={account}
                    selected={account.id === selectedId}
                />
            ))}
        </div>
    );
}
