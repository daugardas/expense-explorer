import prisma from "@/lib/db";
import Link from "next/link";
import Categories from "../../Categories";
import DeleteCategory from "./../DeleteCategory";
import SubCategories from "./../SubCategories";
import CreateSubCategory from "./CreateSubCategory";
import { redirect } from "next/navigation";
import AlertButtonLink from "@/app/components/Links/AlertButtonLink";

export default async function Page({ params }: { params: { id: string } }) {
    const category = await prisma.category.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!category) {
        redirect("/categories");
    }

    return (
        <>
            <Categories selectedId={params.id} />

            <div>
                <div className="min-w-full min-h-full grid grid-cols-[0.3fr_1fr]">
                    <SubCategories parentId={params.id} />
                    <div>
                        {/* <main className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl">{category.name}</h1>
                            <p>{category.description}</p>
                            <div className="flex flex-row gap-2">
                                <AlertButtonLink
                                    href={`/categories/${params.id}/edit`}
                                >
                                    Edit
                                </AlertButtonLink>
                                <DeleteCategory id={params.id} />
                            </div>
                        </main> */}
                        <h1 className="w-full text-center text-2xl font-bold mb-5">
                            Creating a subcategory for {category.name}
                        </h1>
                        <CreateSubCategory id={params.id} />
                    </div>
                </div>
            </div>
        </>
    );
}
