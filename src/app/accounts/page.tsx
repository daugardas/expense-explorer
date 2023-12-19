import prisma from "@/lib/db";
import AccountList from "./AccountList";
import { redirect } from "next/navigation";

export default async function Page() {
    // get the account with the most transactions
    const mostTransactionsAccount = await prisma.account.findFirst({
        select: {
            id: true,
        },
        orderBy: {
            Transaction: {
                _count: "desc",
            },
        },
    });

    if (mostTransactionsAccount)
        redirect(`/accounts/${mostTransactionsAccount.id}`);

    return <AccountList />;
}
