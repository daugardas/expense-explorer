import prisma from "@/lib/db";
import {
    decreaseAccountBalanceByAmount,
    decreaseCategoryTimesUsedByOne,
    increaseAccountBalanceByAmount,
} from "@/lib/utils";
import { TransactionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}

export async function PUT(request: NextRequest) {
    return NextResponse.json({ message: "Hello World" });
}

type TransactionDELETEBody = {
    id: string;
};

type TransactionDELETEResponse = {
    message: string;
};

export async function DELETE(request: NextRequest) {
    const body = (await request.json()) as TransactionDELETEBody;

    try {
        const deletedTransaction = await prisma.transaction.delete({
            where: {
                id: body.id,
            },
        });

        try {
            if (deletedTransaction.type === TransactionType.INCOME) {
                await increaseAccountBalanceByAmount(
                    deletedTransaction.fromAccountId,
                    deletedTransaction.amount
                );
                if (deletedTransaction.toAccountId) {
                    await decreaseAccountBalanceByAmount(
                        deletedTransaction.toAccountId,
                        deletedTransaction.amount
                    );
                }

                if (deletedTransaction.categoryId) {
                    await decreaseCategoryTimesUsedByOne(
                        deletedTransaction.categoryId
                    );
                }
            } else if (deletedTransaction.type === TransactionType.EXPENSE) {
                await decreaseAccountBalanceByAmount(
                    deletedTransaction.fromAccountId,
                    deletedTransaction.amount
                );
                if (deletedTransaction.toAccountId) {
                    await increaseAccountBalanceByAmount(
                        deletedTransaction.toAccountId,
                        deletedTransaction.amount
                    );
                }

                if (deletedTransaction.categoryId) {
                    await decreaseCategoryTimesUsedByOne(
                        deletedTransaction.categoryId
                    );
                }
            } else if (deletedTransaction.type === TransactionType.TRANSFER) {
                await increaseAccountBalanceByAmount(
                    deletedTransaction.fromAccountId,
                    deletedTransaction.amount
                );
                if (deletedTransaction.toAccountId) {
                    await decreaseAccountBalanceByAmount(
                        deletedTransaction.toAccountId,
                        deletedTransaction.amount
                    );
                }
            }
        } catch (error) {
            console.error("Error updating account balance", error);
            return NextResponse.json(
                {
                    message:
                        "deleted the transaction, but failed to update account balance",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Transaction deleted",
        } as TransactionDELETEResponse);
    } catch (error) {
        console.error("Error deleting a transaction", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            { status: 500 }
        );
    }
}
