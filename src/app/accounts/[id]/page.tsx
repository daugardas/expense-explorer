import DeleteAccount from "./DeleteAccount";
import AccountList from "../AccountList";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import AlertButtonLink from "@/app/components/Links/AlertButtonLink";
import AccountCharts from "./AccountCharts";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const account = await prisma.account.findUnique({
        where: {
            id,
        },
    });

    if (!account) {
        redirect("/accounts");
    }

    const hasTransactions = await prisma.transaction.findFirst({
        select: {
            id: true,
        },
        where: {
            OR: [
                {
                    fromAccountId: id,
                },
                {
                    toAccountId: id,
                },
            ],
        },
    });

    return (
        <>
            <AccountList selectedId={id} />
            <div>
                <main className="flex flex-col justify-center items-center gap-2">
                    <h1 className="text-3xl">{account.name}</h1>
                    <p>{account.description}</p>
                    <div className="flex gap-2">
                        <AlertButtonLink href={`/accounts/${id}/edit`}>
                            Edit
                        </AlertButtonLink>
                        <DeleteAccount
                            id={id}
                            hasTransactions={hasTransactions ? true : false}
                        />
                    </div>

                    <AccountCharts id={id} />
                </main>
            </div>
        </>
    );
}
