import prisma from "@/lib/db";
import { TransactionWithCategory } from "@/lib/types";
import {
    decreaseAccountBalanceByAmount,
    decreaseCategoryTimesUsedByOne,
    increaseAccountBalanceByAmount,
} from "@/lib/utils";
import { Transaction, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ message: "Hello World" });
}

export type IncomePostBody = {
    accountId: string;
    categoryId: string;
    date: Date;
    amount: number;
    note: string;
};

export type IncomePostResponse = {
    transaction: TransactionWithCategory;
};

export type IncomePostErrorResponse = {
    message: string;
};

export async function POST(request: NextRequest) {
    const body = (await request.json()) as IncomePostBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const { accountId, categoryId, date, amount, note } = body;

    console.log(body);

    if (!accountId || !categoryId || !date) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    // check if account exists
    try {
        const accountExists = await prisma.account.findUnique({
            where: {
                id: accountId,
            },
        });

        if (!accountExists) {
            return NextResponse.json(
                { message: "Account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if account exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    // check if category exists
    try {
        const categoryExists = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!categoryExists) {
            return NextResponse.json(
                { message: "Category does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if category exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    // create transaction
    try {
        const transaction = await prisma.transaction.create({
            data: {
                fromAccountId: accountId,
                categoryId,
                date: date,
                amount: amount,
                note: note,
                type: TransactionType.INCOME,
            },
            include: {
                category: true,
            },
        });

        try {
            await increaseAccountBalanceByAmount(accountId, amount);
        } catch (error) {
            console.error("Error updating account balance", error);
            return NextResponse.json(
                {
                    message:
                        "Created the transaction, but failed to update account balance",
                },
                { status: 500 }
            );
        }

        try {
            await decreaseCategoryTimesUsedByOne(categoryId);
        } catch (error) {
            console.error("Error updating category times used", error);
            return NextResponse.json(
                {
                    message:
                        "Created the transaction, but failed to update category times used",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            transaction: transaction,
        });
    } catch (error) {
        console.error("Error creating an income transaction", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }
}

export type IncomePutBody = {
    transactionId: string;
    accountId: string;
    categoryId: string;
    date: Date;
    amount: number;
    note: string;
};

export type IncomePutResponse = {
    transaction: TransactionWithCategory;
};

export type IncomePutErrorResponse = {
    message: string;
};

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as IncomePutBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const { transactionId, accountId, categoryId, date, amount, note } = body;

    if (!transactionId || !accountId || !categoryId || !date) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    // check if transaction exists
    let originalTransaction: Transaction | null;
    try {
        originalTransaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
        });

        if (!originalTransaction) {
            return NextResponse.json(
                { message: "Transaction does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if transaction exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const accountExists = await prisma.account.findUnique({
            where: {
                id: accountId,
            },
        });

        if (!accountExists) {
            return NextResponse.json(
                { message: "Account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if account exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const categoryExists = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!categoryExists) {
            return NextResponse.json(
                { message: "Category does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if category exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const transaction = await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                fromAccountId: accountId,
                categoryId,
                date: date,
                amount: amount,
                note: note,
                type: TransactionType.INCOME,
            },
            include: {
                category: true,
            },
        });

        try {
            // reseting account balance to original value before original transaction
            if (originalTransaction.type === TransactionType.TRANSFER) {
                await increaseAccountBalanceByAmount(
                    originalTransaction.fromAccountId,
                    originalTransaction.amount
                );
                if (originalTransaction.toAccountId)
                    await decreaseAccountBalanceByAmount(
                        originalTransaction.toAccountId,
                        originalTransaction.amount
                    );
            } else if (originalTransaction.type === TransactionType.EXPENSE) {
                await increaseAccountBalanceByAmount(
                    originalTransaction.fromAccountId,
                    originalTransaction.amount
                );
            } else if (originalTransaction.type === TransactionType.INCOME) {
                await decreaseAccountBalanceByAmount(
                    originalTransaction.fromAccountId,
                    originalTransaction.amount
                );
            }

            // updating account balance
            await increaseAccountBalanceByAmount(accountId, amount);
        } catch (error) {
            console.error("Error updating account balance", error);
            return NextResponse.json(
                {
                    message:
                        "Updated the transaction, but failed to update account balance",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            transaction: transaction,
        });
    } catch (error) {
        console.error("Error updating a transaction", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}
