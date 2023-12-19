import prisma from "@/lib/db";
import { CategoryType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export type SubCategoryGETBody = {
    id: string;
};

export type SubCategoryGETResponse = {
    message: string;
};

export async function GET(request: NextRequest) {
    const body = (await request.json()) as SubCategoryGETBody | null;

    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id } = body;

    if (!id) {
        return NextResponse.json({ message: "Invalid body" });
    }

    if (id) {
        try {
            const subCategory = await prisma.category.findFirst({
                where: {
                    id: id,
                },
            });

            if (!subCategory) {
                return NextResponse.json(
                    {
                        message: "Subcategory not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            return NextResponse.json(
                {
                    subCategory,
                },
                {
                    status: 200,
                }
            );
        } catch (error) {
            return NextResponse.json(
                { message: "Something wrong happened" },
                {
                    status: 500,
                }
            );
        }
    }
}

export type SubCategoryPOSTBody = {
    parentId: string;
    name: string;
    description?: string;
};

export type SubCategoryPOSTResponse = {
    message: string;
};

export async function POST(request: NextRequest) {
    const body = (await request.json()) as SubCategoryPOSTBody | null;

    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { parentId, name, description } = body;

    if (!name || !parentId) {
        return NextResponse.json({ message: "Invalid body" });
    }

    let parent: {
        id: string;
        name: string;
        description: string | null;
        type: CategoryType;
        parentId: string | null;
    } | null = null;

    try {
        parent = await prisma.category.findFirst({
            where: {
                id: parentId,
            },
        });

        if (!parent) {
            return NextResponse.json(
                {
                    message: "Parent category not found",
                },
                {
                    status: 404,
                }
            );
        }
    } catch (error) {
        console.error("Error while checking if parent exists. Error: ", error);
        return NextResponse.json(
            {
                message:
                    "Something wrong happened while searching for parent category",
            },
            {
                status: 500,
            }
        );
    }

    try {
        const category = await prisma.category.findFirst({
            where: {
                name: name,
                parentId: parentId,
            },
        });

        if (category) {
            return NextResponse.json(
                {
                    message:
                        "Sub category with this name already exists in this category",
                },
                {
                    status: 400,
                }
            );
        }
    } catch (error) {
        console.error(
            "Error while checking if sub category exists. Error: ",
            error
        );
        return NextResponse.json(
            {
                message:
                    "Something wrong happened while searching for duplicates.",
            },
            {
                status: 500,
            }
        );
    }

    try {
        await prisma.category.create({
            data: {
                name,
                description,
                parentId,
                type: parent.type,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Sub category created" });
    } catch (error) {
        console.error("Error while creating sub category. Error: ", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type SubCategoryPUTBody = {
    id: string;
    name: string;
    description?: string;
};

export type SubCategoryPUTResponse = {
    message: string;
};

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as SubCategoryPUTBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id, name, description } = body;

    if (!id || !name) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name,
                description,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Sub category updated" });
    } catch (error) {
        console.error("Error while updating sub category. Error: ", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type SubCategoryDELETEBody = {
    id: string;
} | null;

export type SubCategoryDELETEResponse = {
    message: string;
};

export async function DELETE(request: NextRequest) {
    const body = (await request.json()) as SubCategoryDELETEBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id } = body;

    if (!id) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        await prisma.category.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Sub category deleted" });
    } catch (error) {
        console.error("Error while deleting sub category. Error: ", error);
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}
