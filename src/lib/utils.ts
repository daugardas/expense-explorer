import { TransactionType } from "@prisma/client";
import prisma from "./db";

export function increaseAccountBalanceByAmount(
    accountId: string,
    amount: number
) {
    return prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            balance: {
                increment: amount,
            },
        },
    });
}

export function decreaseAccountBalanceByAmount(
    accountId: string,
    amount: number
) {
    return prisma.account.update({
        where: {
            id: accountId,
        },
        data: {
            balance: {
                decrement: amount,
            },
        },
    });
}

export async function increaseCategoryTimesUsedByOne(categoryId: string) {
    // also if category has a parent, increase the parent's timesUsed by one
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (category?.parentId) {
        increaseCategoryTimesUsedByOne(category.parentId);
    }

    return prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            timesUsed: {
                increment: 1,
            },
        },
    });
}

export async function decreaseCategoryTimesUsedByOne(categoryId: string) {
    // also if category has a parent, decrease the parent's timesUsed by one
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (category?.parentId) {
        decreaseCategoryTimesUsedByOne(category.parentId);
    }

    return prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            timesUsed: {
                decrement: 1,
            },
        },
    });
}

export function convertDataFromDBForUseInChart(
    data: {
        type: TransactionType;
        month: number;
        year: number;
        total: number;
    }[]
) {
    const chartData: {
        name: string;
        income: number;
        expenses: number;
    }[] = [];

    let dataIndex = 0;
    let earliestYear = Number(data[0].year);
    let earliestMonth = Number(data[0].month);
    let latestYear = Number(data[data.length - 1].year);
    let latestMonth = Number(data[data.length - 1].month);

    // fill in data for each month
    for (let year = earliestYear; year <= latestYear; year++) {
        const startMonth = year === earliestYear ? earliestMonth : 1;
        const months = year === latestYear ? latestMonth : 12;
        for (let month = startMonth; month <= months; month++) {
            chartData.push({
                name: `${year}-${month < 10 ? "0" + month : month}`,
                income: 0,
                expenses: 0,
            });

            while (
                data[dataIndex] &&
                Number(data[dataIndex].year) === year &&
                Number(data[dataIndex].month) === month
            ) {
                if (data[dataIndex].type === "INCOME") {
                    chartData[chartData.length - 1].income +=
                        data[dataIndex].total;
                } else {
                    chartData[chartData.length - 1].expenses +=
                        data[dataIndex].total;
                }
                dataIndex++;
            }
        }
    }

    return chartData;
}
