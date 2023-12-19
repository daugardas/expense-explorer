import Categories from "@/app/categories/Categories";
import prisma from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditSubCategory from "./EditSubCategory";
import SubCategories from "../../../SubCategories";
import DeleteSubCategory from "../DeleteSubCategory";
import AlertButtonLink from "@/app/components/Links/AlertButtonLink";

export default async function Page({
    params,
}: {
    params: { id: string; subId: string };
}) {
    const parentCategory = await prisma.category.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!parentCategory) {
        redirect("/categories");
    }

    const subCategory = await prisma.category.findUnique({
        where: {
            id: params.subId,
            parentId: params.id,
        },
    });

    if (!subCategory) {
        redirect(`/categories/${params.id}`);
    }

    return (
        <>
            <Categories selectedId={params.id} />

            <div>
                <div className="min-w-full min-h-full grid grid-cols-[0.3fr_1fr]">
                    <SubCategories
                        parentId={params.id}
                        selectedSubCategoryId={params.subId}
                    />
                    <div>
                        <main className="mb-2 flex flex-col justify-center items-center">
                            <h1 className="text-3xl">{subCategory.name}</h1>
                            <p>{subCategory.description}</p>
                            <div className="flex flex-row gap-2 mt-1">
                                {/* <AlertButtonLink
                                    href={`/categories/${params.id}/subcategories/${params.subId}/edit`}
                                >
                                    Edit
                                </AlertButtonLink> */}
                                <DeleteSubCategory
                                    parentId={params.id}
                                    subId={params.subId}
                                />
                            </div>
                        </main>
                        <EditSubCategory originalSubCategory={subCategory} />
                    </div>
                </div>
            </div>
        </>
    );
}
