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
