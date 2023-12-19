import prisma from "@/lib/db";
import Categories from "./Categories";
import { redirect } from "next/navigation";

export default async function Page() {
    const mostUsedCategoryId = await prisma.category.findFirst({
        select: {
            id: true,
        },
        orderBy: {
            timesUsed: "desc",
        },
    });

    if (mostUsedCategoryId) {
        redirect(`/categories/${mostUsedCategoryId.id}`);
    }

    return <Categories />;
}
