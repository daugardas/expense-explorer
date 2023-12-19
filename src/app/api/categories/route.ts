import prisma from "@/lib/db";
import { CategoryType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export type CategoryGETResponse = {
    categories: {
        id: string;
        name: string;
        description: string | null;
        type: CategoryType;
        createdAt: Date;
        parentId: string | null;
    }[];
};

export async function GET() {
    try {
        const categories = await prisma.category.findMany();

        return NextResponse.json(
            {
                categories,
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

export type CategoryPOSTBody = {
    name: string;
    type: CategoryType;
    description?: string;
};

export type CategoryPOSTResponse = {
    message: string;
};

export async function POST(request: NextRequest) {
    const body = (await request.json()) as CategoryPOSTBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { name, type, description } = body;

    if (!name || !type) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        const category = await prisma.category.findFirst({
            where: {
                name: name,
                type: type,
            },
        });

        if (category) {
            return NextResponse.json(
                {
                    message:
                        "Category with such a name and type already exists",
                },
                {
                    status: 400,
                }
            );
        }
    } catch (error) {
        console.error(
            "Error while checking if category exists. Error: ",
            error
        );
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }

    try {
        await prisma.category.create({
            data: {
                name,
                type,
                description,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Category created" });
    } catch (error) {
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type CategoryPUTBody = {
    id: string;
    name: string;
    type: CategoryType;
    description?: string;
};

export type CategoryPUTResponse = {
    message: string;
};

export async function PUT(request: NextRequest) {
    const body = (await request.json()) as CategoryPUTBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id, name, type, description } = body;

    if (!id || !name || !type) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        await prisma.category.update({
            where: {
                id: id,
            },
            data: {
                name,
                type,
                description,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Category updated" });
    } catch (error) {
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}

export type CategoryDELETEBody = {
    id: string;
} | null;

export type CategoryDELETEResponse = {
    message: string;
};

export async function DELETE(request: NextRequest) {
    const body = (await request.json()) as CategoryDELETEBody | null;
    if (!body) {
        return NextResponse.json({ message: "Invalid body" });
    }

    const { id } = body;

    if (!id) {
        return NextResponse.json({ message: "Invalid body" });
    }

    try {
        const hasSubCategories = await prisma.category.findFirst({
            where: {
                parentId: id,
            },
        });

        if (hasSubCategories) {
            return NextResponse.json(
                {
                    message: "Category has sub categories",
                },
                {
                    status: 400,
                }
            );
        }
    } catch (error) {
        console.error(
            "Error while checking if category has sub categories. Error: ",
            error
        );
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }

    try {
        const hasTransactions = await prisma.transaction.findFirst({
            where: {
                categoryId: id,
            },
        });

        if (hasTransactions) {
            return NextResponse.json(
                {
                    message: "Category has transactions",
                },
                {
                    status: 400,
                }
            );
        }
    } catch (error) {
        console.error(
            "Error while checking if category has transactions. Error: ",
            error
        );
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }

    try {
        await prisma.category.delete({
            where: {
                id: id,
            },
        });

        revalidatePath("/categories");
        return NextResponse.json({ message: "Category deleted" });
    } catch (error) {
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}
