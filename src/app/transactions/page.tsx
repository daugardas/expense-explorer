import prisma from "@/lib/db";
import {
    TransactionWithCategory,
    TransactionWithCategoryByDate,
} from "@/lib/types";
import TransactionsList from "./TransactionsList";
import { getCategoriesWithSubcategories } from "@/lib/db_queries";

export default async function Page() {
    const allTransactionsWithCategoryNames: TransactionWithCategory[] =
        await prisma.transaction.findMany({
            include: {
                category: true,
            },
            orderBy: {
                date: "desc",
            },
        });

    const accounts = await prisma.account.findMany();

    const categories = await getCategoriesWithSubcategories();

    // group transactions by date
    let transactionsByDate: TransactionWithCategoryByDate = {};
    allTransactionsWithCategoryNames.forEach((transaction) => {
        const date = transaction.date.toISOString().split("T")[0];
        if (!transactionsByDate[date]) transactionsByDate[date] = [];
        transactionsByDate[date].push(transaction);
    });

    return (
        <TransactionsList
            transactionsByDate={transactionsByDate}
            accounts={accounts}
            categories={categories}
        />
    );
}
