import { NextResponse } from "next/server";
import { CategoryWithSubcategories } from "@/lib/types";
import { getCategoriesWithSubcategories } from "@/lib/db_queries";

export type CategoriesWithSubCategoriesGETResponse = {
    categories: CategoryWithSubcategories[];
};

export async function GET() {
    try {
        const categories = await getCategoriesWithSubcategories();

        return NextResponse.json(
            {
                categories,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Error while getting categories with subcategories",
            error
        );
        return NextResponse.json(
            { message: "Something wrong happened" },
            {
                status: 500,
            }
        );
    }
}
