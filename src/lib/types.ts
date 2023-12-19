import { Category, Transaction } from "@prisma/client";

export type CategoryWithSubcategories = {
    subCategories: Category[];
} & Category;

export type TransactionWithCategory = Transaction & {
    category: Category | null;
};

export type TransactionWithCategoryByDate = {
    [date: string]: TransactionWithCategory[];
};
