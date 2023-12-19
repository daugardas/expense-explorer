import prisma from "@/lib/db";
import Link from "next/link";
import Categories from "../Categories";
import DeleteCategory from "./DeleteCategory";
import SubCategories from "./SubCategories";
import { redirect } from "next/navigation";
import AlertButtonLink from "@/app/components/Links/AlertButtonLink";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params;

    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });

    if (!category) {
        redirect("/categories");
    }

    if (category.parentId) {
        redirect(`/categories/${category.parentId}/subcategories/${id}`);
    }

    const hasTransactions = await prisma.transaction.findFirst({
        select: {
            id: true,
        },
        where: {
            categoryId: id,
        },
    });

    const hasSubCategories = await prisma.category.findFirst({
        select: {
            id: true,
        },
        where: {
            parentId: id,
        },
    });

    return (
        <>
            <Categories selectedId={params.id} />

            <div>
                <div className="min-w-full min-h-full grid grid-cols-[0.3fr_1fr]">
                    <SubCategories parentId={id} />
                    <div>
                        <main className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl">{category.name}</h1>
                            <p>{category.description}</p>
                            <div className="flex flex-row gap-2">
                                <AlertButtonLink
                                    href={`/categories/${id}/edit`}
                                >
                                    Edit
                                </AlertButtonLink>
                                <DeleteCategory
                                    id={id}
                                    hasTransactions={
                                        hasTransactions ? true : false
                                    }
                                    hasSubCategories={
                                        hasSubCategories ? true : false
                                    }
                                />
                            </div>

                            <div>charts...</div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
