import { TransactionType } from "@prisma/client";
import prisma from "./db";
import { CategoryWithSubcategories } from "./types";

export async function getCategoriesWithSubcategories(): Promise<
    CategoryWithSubcategories[]
> {
    return await prisma.category.findMany({
        where: {
            parentId: null,
        },
        include: {
            subCategories: true,
        },
        orderBy: {
            name: "asc",
        },
    });
}

export async function getTransactionsDataForAccountChart(
    accountId: string
): Promise<
    { type: TransactionType; month: number; year: number; total: number }[]
> {
    return await prisma.$queryRaw<
        { type: TransactionType; month: number; year: number; total: number }[]
    >`
    SELECT
        type,
        EXTRACT(MONTH FROM date) AS month,
        EXTRACT(YEAR FROM date) AS year,
        SUM(amount) AS total
    FROM
        "Transaction"
    WHERE
        "fromAccountId" = ${accountId}
    GROUP BY
        type,
        month,
        year
    ORDER BY
        year ASC,
        month ASC
`;
}

export async function getTop5CategoriesByTimesUsedForAccount(
    accountId: string
): Promise<{ name: string; total: number }[]> {
    return await prisma.$queryRaw<
        { type: string; name: string; total: number }[]
    >`
    SELECT
        C.type as type,
        C.name as name,
        SUM(C."timesUsed") as total
    FROM
        "Transaction" AS T
    LEFT JOIN
        "Category" as C ON T."categoryId" = C."id"
    WHERE
        ("fromAccountId" = ${accountId} OR "toAccountId" = ${accountId}) AND "categoryId" IS NOT NULL
    GROUP BY
        C.name,
        C.type
`;
}
