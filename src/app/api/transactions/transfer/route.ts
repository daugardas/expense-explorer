import prisma from "@/lib/db";
import { TransactionWithCategory } from "@/lib/types";
import {
    decreaseAccountBalanceByAmount,
    increaseAccountBalanceByAmount,
} from "@/lib/utils";
import { Transaction, TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}

export type TransferPostBody = {
    fromAccountId: string;
    toAccountId: string;
    date: Date;
    amount: number;
    note: string;
};

export type TransferPostResponse = {
    transaction: TransactionWithCategory;
};

export type TransferPostErrorResponse = {
    message: string;
};

export async function POST(request: NextRequest) {
    const body = (await request.json()) as TransferPostBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const { fromAccountId, toAccountId, date, amount, note } = body;

    if (!fromAccountId || !toAccountId || !date) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    try {
        const fromAccountExists = await prisma.account.findUnique({
            where: {
                id: fromAccountId,
            },
        });

        if (!fromAccountExists) {
            return NextResponse.json(
                { message: "Sender account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if sender account exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const toAccountExists = await prisma.account.findUnique({
            where: {
                id: fromAccountId,
            },
        });

        if (!toAccountExists) {
            return NextResponse.json(
                { message: "Receiver account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if Receiver account exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const transaction = await prisma.transaction.create({
            data: {
                fromAccountId: fromAccountId,
                toAccountId: toAccountId,
                date: date,
                amount: amount,
                note: note,
                type: TransactionType.TRANSFER,
            },
            include: {
                category: true,
            },
        });

        try {
            await decreaseAccountBalanceByAmount(fromAccountId, amount);
            await increaseAccountBalanceByAmount(toAccountId, amount);
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

        return NextResponse.json({
            transaction: transaction,
        });
    } catch (error) {
        console.error("Error creating a transfer transaction", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }
}

export type TransferPutBody = {
    transactionId: string;
    fromAccountId: string;
    toAccountId: string;
    date: Date;
    amount: number;
    note: string;
};

export type TransferPutResponse = {
    transaction: TransactionWithCategory;
};

export type TransferPutErrorResponse = {
    message: string;
};

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as TransferPutBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" }, { status: 400 });
    }

    const { transactionId, fromAccountId, toAccountId, date, amount, note } =
        body;

    if (!transactionId || !fromAccountId || !toAccountId || !date) {
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
        const fromAccountExists = await prisma.account.findUnique({
            where: {
                id: fromAccountId,
            },
        });

        if (!fromAccountExists) {
            return NextResponse.json(
                { message: "Sender account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if sender account exists", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }

    try {
        const toAccountExists = await prisma.account.findUnique({
            where: {
                id: fromAccountId,
            },
        });

        if (!toAccountExists) {
            return NextResponse.json(
                { message: "Receiver account does not exist" },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error checking if Receiver account exists", error);
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
                fromAccountId: fromAccountId,
                toAccountId: toAccountId,
                date: date,
                amount: amount,
                note: note,
                type: TransactionType.TRANSFER,
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

            // updating account balance with new transaction
            await decreaseAccountBalanceByAmount(fromAccountId, amount);
            await increaseAccountBalanceByAmount(toAccountId, amount);
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
