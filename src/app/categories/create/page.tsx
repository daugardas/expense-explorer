import Categories from "../Categories";
import CreateCategory from "./CreateCategory";

export default async function Page() {
    return (
        <>
            <Categories />
            <div>
                <h1 className="w-full text-center text-2xl font-bold mb-5">
                    Create Category
                </h1>
                <CreateCategory />
            </div>
        </>
    );
}
