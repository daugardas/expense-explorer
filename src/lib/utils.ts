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
