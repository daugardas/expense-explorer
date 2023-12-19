import PrimaryButtonLink from "@/app/components/Links/PrimaryButtonLink";
import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import Link from "next/link";

function SubCategoryItem({
    subCategory,
    selected,
}: {
    subCategory: Category;
    selected: boolean;
}) {
    return (
        <Link
            href={`/categories/${subCategory.id}`}
            className={`bg-white w-52 shadow-sm rounded-md p-2 hover:bg-isabelline min-w-full ${
                selected ? "!bg-boneDark !hover:bg-boneDark" : ""
            }`}
        >
            <h2>{subCategory.name}</h2>
        </Link>
    );
}

function SubCategoryList({
    subCategories,
    selectedId,
}: {
    subCategories: Category[];
    selectedId?: string;
}) {
    return (
        <>
            {subCategories.map((subCategory) => (
                <SubCategoryItem
                    key={subCategory.id}
                    subCategory={subCategory}
                    selected={selectedId === subCategory.id}
                />
            ))}
        </>
    );
}

export default async function SubCategories({
    parentId,
    selectedSubCategoryId,
}: {
    parentId: string;
    selectedSubCategoryId?: string;
}) {
    const subCategories = await prisma.category.findMany({
        where: {
            parentId: parentId,
        },
    });

    return (
        <div className="px-5 flex flex-col items-center gap-2">
            <h1 className="text-2xl text-center min-w-full h-fit">
                Sub Categories
            </h1>
            <PrimaryButtonLink href={`/categories/${parentId}/create`}>
                + Add
            </PrimaryButtonLink>

            <SubCategoryList
                subCategories={subCategories}
                selectedId={selectedSubCategoryId}
            />
        </div>
    );
}
