import prisma from "@/lib/db";
import EditAccountForm from "./EditAccountForm";
import { redirect } from "next/navigation";
import AccountList from "../../AccountList";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const account = await prisma.account.findUnique({
        where: {
            id: id,
        },
    });

    if (!account) {
        redirect("/accounts");
    }

    return (
        <>
            <AccountList selectedId={id} />
            <div>
                <h1 className="w-full text-center text-2xl font-bold mb-5">
                    <span className="font-normal">Editing</span> {account.name}
                </h1>
                <EditAccountForm originalAccount={account} />
            </div>
        </>
    );
}
