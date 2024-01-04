import { CategoryType, PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const load = async () => {
    try {
        await prisma.$connect();
        //console.log("Database connected. Creating default categories...");

        // read default_categories.json
        const defaultCategories: {
            name: string;
            description: string;
            type: CategoryType;
            subcategories: {
                name: string;
                description: string;
                type: CategoryType;
            }[];
        }[] = require("./default_categories.json");

        // create categories
        for (const category of defaultCategories) {
            //console.log("Creating category: ", category);

            const createdCategory = await prisma.category.create({
                data: {
                    name: category.name,
                    description: category.description,
                    type: category.type,
                },
            });

            console.log("Created category: ", createdCategory);

            // create subcategories
            for (const subcategory of category.subcategories) {
                await prisma.category.create({
                    data: {
                        name: subcategory.name,
                        description: subcategory.description,
                        type: subcategory.type,
                        parentId: createdCategory.id,
                    },
                });
            }
        }
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log("Categories created. Database disconnected.");
    }
};

load();
