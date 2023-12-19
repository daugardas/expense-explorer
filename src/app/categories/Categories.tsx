import prisma from "@/lib/db";
import { Category } from "@prisma/client";
import Link from "next/link";
import PrimaryButtonLink from "../components/Links/PrimaryButtonLink";
import { redirect } from "next/navigation";

function CategoryItem({
    category,
    selected,
}: {
    category: Category;
    selected: boolean;
}) {
    return (
        <Link
            href={`/categories/${category.id}`}
            className={`bg-white w-52 shadow-sm rounded-md p-2 hover:bg-isabelline min-w-full ${
                selected ? "!bg-boneDark !hover:bg-boneDark" : ""
            }`}
        >
            <h2>{category.name}</h2>
        </Link>
    );
}

function CategoryList({
    categories,
    selectedId,
}: {
    categories: Category[];
    selectedId?: string;
}) {
    return (
        <>
            {categories.map((category) => (
                <CategoryItem
                    key={category.id}
                    category={category}
                    selected={category.id === selectedId}
                />
            ))}
        </>
    );
}

export default async function Categories({
    selectedId,
}: {
    selectedId?: string;
}) {
    const categories = await prisma.category.findMany({
        where: {
            parentId: null,
        },
    });

    const incomeCategories = categories.filter(
        (category) => category.type === "INCOME"
    );

    const expenseCategories = categories.filter(
        (category) => category.type === "EXPENSE"
    );

    return (
        <div className="px-5 flex flex-col items-center gap-2">
            <h1 className="text-2xl text-center min-w-full h-fit">
                Categories
            </h1>
            <PrimaryButtonLink href="/categories/create">
                Create a new category
            </PrimaryButtonLink>

            <h2 className="text-xl text-center min-w-full h-fit">
                Income categories
            </h2>
            <CategoryList
                categories={incomeCategories}
                selectedId={selectedId}
            />

            <h2 className="text-xl text-center min-w-full h-fit">
                Expense categories
            </h2>
            <CategoryList
                categories={expenseCategories}
                selectedId={selectedId}
            />
        </div>
    );
}
