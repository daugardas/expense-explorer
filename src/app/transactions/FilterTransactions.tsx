import { Category, TransactionType } from "@prisma/client";
import { useEffect, useState } from "react";
import Label from "../components/Form/Label";
import { toast } from "react-toastify";
import { CategoryGETResponse } from "../api/categories/route";
import AnimatedArrow from "../components/Icons/AnimatedArrow";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NoteFilter({
    note,
    setNote,
}: {
    note: string;
    setNote: (note: string) => void;
}) {
    return (
        <div className=" min-w-[120px] flex-auto">
            <Label className="">By note</Label>
            <div className="text-gray-500 flex flex-row items-center text-sm ">
                <input
                    type="text"
                    className="h-8 border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-500 cursor-pointer [&_input]:!focus:outline-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </div>
        </div>
    );
}

function AmountRangeFilter({
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
}: {
    minAmount: number;
    setMinAmount: (amount: number) => void;
    maxAmount: number;
    setMaxAmount: (amount: number) => void;
}) {
    return (
        <div className="">
            <Label className="">By amount range</Label>
            <div className=" [&_input]:w-24 text-gray-500 flex flex-row items-center text-sm ">
                <input
                    type="number"
                    className="h-8 border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-500 cursor-pointer [&_input]:!focus:outline-none"
                    value={minAmount}
                    onChange={(e) => setMinAmount(Number(e.target.value))}
                />
                <span className="px-2">to</span>
                <input
                    type="number"
                    className="h-8  border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-500 cursor-pointer [&_input]:!focus:outline-none"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(Number(e.target.value))}
                />
            </div>
        </div>
    );
}

function DateRangeFilter({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
}: {
    startDate: Date | null;
    setStartDate: (date: Date) => void;
    endDate: Date | null;
    setEndDate: (date: Date) => void;
}) {
    return (
        <div className="">
            <Label className="">By date range</Label>
            <div className=" [&_input]:w-24 text-gray-500 flex flex-row items-center text-sm ">
                <DatePicker
                    selected={startDate}
                    onChange={(d) => setStartDate(d as Date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="h-8 border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-500 cursor-pointer [&_input]:!focus:outline-none"
                />
                <span className="px-2">to</span>
                <DatePicker
                    selected={endDate}
                    onChange={(d) => setEndDate(d as Date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="h-8  border border-gray-300 rounded-md w-full px-2 py-1 text-sm text-gray-500 cursor-pointer [&_input]:!focus:outline-none"
                />
            </div>
        </div>
    );
}

function TypeFilter({
    setFilterOutTypes,
}: {
    setFilterOutTypes: (types: TransactionType[]) => void;
}) {
    const [showTypes, setShowTypes] = useState<boolean>(false);
    const [selectedTypes, setSelectedTypes] = useState<TransactionType[]>([]);

    useEffect(() => {
        setFilterOutTypes(selectedTypes);
    }, [selectedTypes, setFilterOutTypes]);

    return (
        <div className="w-48">
            <Label>By type</Label>
            <div className="relative">
                <div
                    id="type-filter"
                    className="h-8 flex flex-col items-start justify-center w-full px-4 py-2 text-xs border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                    onClick={() => setShowTypes(!showTypes)}
                >
                    <div className="flex flex-row items-center justify-between w-full">
                        <span className="text-gray-500">
                            {selectedTypes.length} selected
                        </span>
                        <AnimatedArrow
                            rotationClass={showTypes ? "rotate-180" : ""}
                        />
                    </div>
                </div>
                <div
                    className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg overflow-y-auto max-h-60 ${
                        showTypes ? "" : "hidden"
                    }`}
                >
                    {Object.values(TransactionType).map((type) => (
                        <div
                            key={type}
                            className={`flex flex-row w-full px-2 py-2 text-sm cursor-pointer hover:bg-isabellineLight items-center`}
                            onClick={
                                selectedTypes.includes(type)
                                    ? () =>
                                          setSelectedTypes(
                                              selectedTypes.filter(
                                                  (t) => t !== type
                                              )
                                          )
                                    : () =>
                                          setSelectedTypes([
                                              ...selectedTypes,
                                              type,
                                          ])
                            }
                        >
                            {/* check box */}
                            <div
                                className={`w-4 h-4 border border-gray-300 rounded-md ${
                                    selectedTypes.includes(type)
                                        ? "bg-khaki"
                                        : ""
                                }`}
                            ></div>
                            <span className="ml-2">
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function CategoryFilter({
    categories,
    setFilterOutCategoriesIds,
}: {
    categories: Category[];
    setFilterOutCategoriesIds: (ids: string[]) => void;
}) {
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        setFilterOutCategoriesIds(selectedCategories);
    }, [selectedCategories, setFilterOutCategoriesIds]);

    return (
        <div className="w-48">
            <Label>By category</Label>
            <div className="relative">
                <div
                    id="category-filter"
                    className="h-8 flex flex-col items-start justify-center w-full px-4 py-2 text-xs border border-gray-300 rounded-md cursor-pointer focus:outline-none"
                    onClick={() => setShowCategories(!showCategories)}
                >
                    <div className="flex flex-row items-center justify-between w-full">
                        <span className="text-gray-500">
                            {selectedCategories.length} selected
                        </span>
                        <AnimatedArrow
                            rotationClass={showCategories ? "rotate-180" : ""}
                        />
                    </div>
                </div>
                <div
                    className={`absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg overflow-y-auto max-h-60 ${
                        showCategories ? "" : "hidden"
                    }`}
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`flex flex-row w-full px-2 py-2 text-sm cursor-pointer hover:bg-isabellineLight items-center`}
                            onClick={
                                selectedCategories.includes(category.id)
                                    ? () =>
                                          setSelectedCategories(
                                              selectedCategories.filter(
                                                  (id) => id !== category.id
                                              )
                                          )
                                    : () =>
                                          setSelectedCategories([
                                              ...selectedCategories,
                                              category.id,
                                          ])
                            }
                        >
                            {/* check box */}
                            <div
                                className={`w-4 h-4 border border-gray-300 rounded-md ${
                                    selectedCategories.includes(category.id)
                                        ? "bg-khaki"
                                        : ""
                                }`}
                            ></div>
                            <span className="ml-2">{category.name}</span>
                            <span className="text-gray-300 text-xs flex-auto text-right">
                                {category.type.charAt(0) +
                                    category.type.slice(1, 3).toLowerCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function FilterTransactions({
    setFilterOutCategoriesIds,
    setFilterOutTypes,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    minAmount,
    setMinAmount,
    maxAmount,
    setMaxAmount,
    note,
    setNote,
}: {
    setFilterOutCategoriesIds: (ids: string[]) => void;
    setFilterOutTypes: (types: TransactionType[]) => void;
    startDate: Date | null;
    setStartDate: (date: Date) => void;
    endDate: Date | null;
    setEndDate: (date: Date) => void;
    minAmount: number;
    setMinAmount: (amount: number) => void;
    maxAmount: number;
    setMaxAmount: (amount: number) => void;
    note: string;
    setNote: (note: string) => void;
}) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("/api/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                toast.error(
                    "Failed to fetch categories. Check console for more info."
                );
                console.error(response);
                return;
            }

            const body = (await response.json()) as CategoryGETResponse;
            setCategories(body.categories);
        };

        fetchCategories();
    }, []);

    return (
        <div className="flex flex-row gap-2 flex-auto flex-wrap">
            <div className="flex text-lg justify-center items-center">
                Filters:
            </div>

            <DateRangeFilter
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />

            <TypeFilter setFilterOutTypes={setFilterOutTypes} />

            <CategoryFilter
                categories={categories}
                setFilterOutCategoriesIds={setFilterOutCategoriesIds}
            />

            <AmountRangeFilter
                minAmount={minAmount}
                setMinAmount={setMinAmount}
                maxAmount={maxAmount}
                setMaxAmount={setMaxAmount}
            />

            <NoteFilter note={note} setNote={setNote} />
        </div>
    );
}
