import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import EditCategory from "./EditCategory";
import Link from "next/link";
import Categories from "../../Categories";
import DeleteCategory from "../DeleteCategory";
import SubCategories from "../SubCategories";
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

    return (
        <>
            <Categories selectedId={params.id} />

            <div>
                <div className="min-w-full min-h-full grid grid-cols-[0.3fr_1fr]">
                    <SubCategories parentId={params.id} />
                    <div>
                        <main className="flex flex-col justify-center items-center mb-2">
                            <h1 className="text-3xl font-bold">
                                <span className="font-normal">Editing </span>
                                {category.name}
                            </h1>
                            <p>{category.description}</p>
                            <div className="flex flex-row gap-2 mt-1">
                                {/* <AlertButtonLink
                                    href={`/categories/${params.id}/edit`}
                                >
                                    Edit
                                </AlertButtonLink> */}
                                <DeleteCategory id={params.id} />
                            </div>
                        </main>
                        <EditCategory originalCategory={category} />
                    </div>
                </div>
            </div>
        </>
    );
}
