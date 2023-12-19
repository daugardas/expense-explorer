import prisma from "@/lib/db";
import { Account, AccountType, Currency } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export type AccountGETResponse = {
    accounts: Account[];
};

export async function GET() {
    try {
        const accounts = await prisma.account.findMany();

        return NextResponse.json(
            {
                accounts,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log("Couldn't search for accounts. Error: ", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type POSTBody = {
    name: string;
    type: AccountType;
    description: string;
    currency: Currency;
    initialBalance: string;
} | null;

export type POSTResponse = {
    message: string;
};

export async function POST(request: NextRequest) {
    const body = (await request.json()) as POSTBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { name, type, description, currency, initialBalance } = body;

    if (!name || !type || !currency) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        const accountWithNameExists = await prisma.account.findFirst({
            where: {
                name: name,
            },
        });

        if (accountWithNameExists) {
            return NextResponse.json(
                {
                    message: `Account with name ${name} already exists`,
                },
                {
                    status: 400,
                }
            );
        }

        const balance = parseFloat(
            initialBalance === "" ? "0" : initialBalance
        );

        const account = await prisma.account.create({
            data: {
                name,
                type,
                description,
                currency,
                balance: balance,
            },
        });

        revalidatePath("/accounts");

        return NextResponse.json(
            {
                message: `Account with name ${account.name} created`,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.log(
            "Couldn't search for account or create account. Error: ",
            error
        );
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type PUTBody = {
    id: string;
    name: string;
    type: AccountType;
    description: string;
    currency: Currency;
} | null;

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as PUTBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id, name, type, description, currency } = body;

    if (!id || !name || !type || !currency) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        const account = await prisma.account.update({
            where: {
                id: id,
            },
            data: {
                name,
                type,
                description,
                currency,
            },
        });

        revalidatePath("/accounts");

        return NextResponse.json(
            {
                message: `Account with name ${account.name} updated`,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type DELETEBody = {
    id: string;
} | null;

export async function DELETE(request: NextRequest) {
    const body = (await request.json()) as DELETEBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id } = body;

    if (!id) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        const account = await prisma.account.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/accounts");
        //redirect("/accounts");

        return NextResponse.json(
            {
                message: `Account with name ${account.name} deleted`,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}
