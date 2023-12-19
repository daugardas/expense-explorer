import Select from "@/app/components/Form/Select/Select";
import Option from "@/app/components/Form/Select/Option";
import { Category } from "@prisma/client";
import { CategoryWithSubcategories } from "@/lib/types";

export default function TransactionCategorySelect({
    categoriesWithSubcategories,
    selectedCategoryId,
    setSelectedCategoryId,
}: {
    categoriesWithSubcategories: CategoryWithSubcategories[];
    selectedCategoryId: string | null;
    setSelectedCategoryId: (id: string) => void;
}) {
    return (
        <Select
            name="category"
            className=""
            value={selectedCategoryId ?? undefined}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
            {categoriesWithSubcategories.map((category) => {
                let categoryOptions: Category[] = [];
                categoryOptions.push(category);
                categoryOptions.push(...category.subCategories);

                return categoryOptions.map((cat, index) => {
                    return (
                        <Option
                            key={cat.id}
                            value={cat.id}
                            className={
                                index === 0 ? "font-bold italic" : "pl-2"
                            }
                        >
                            {cat.name}
                        </Option>
                    );
                });
            })}
        </Select>
    );
}
