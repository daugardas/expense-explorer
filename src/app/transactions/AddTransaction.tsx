"use client";
import { useEffect, useState } from "react";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import ClientModal from "@/app/components/ClientModal";
import CreateTransaction from "./CreateTransaction";
import { toast } from "react-toastify";
import {
    CategoryWithSubcategories,
    TransactionWithCategory,
} from "@/lib/types";
import { Account } from "@prisma/client";
import { CategoriesWithSubCategoriesGETResponse } from "@/app/api/categories/with-subcategories/route";
import { AccountGETResponse } from "@/app/api/accounts/route";
import DangerButton from "@/app/components/Buttons/DangerButton";

export default function AddTransaction({
    addTransactionToList,
}: {
    addTransactionToList: (transaction: TransactionWithCategory) => void;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [categoriesWithSubcategories, setCategoriesWithSubcategories] =
        useState<CategoryWithSubcategories[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch("/api/categories/with-subcategories", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                toast.error("Failed to fetch categories.");
                return;
            }

            const body =
                (await response.json()) as CategoriesWithSubCategoriesGETResponse;
            const { categories } = body;
            setCategoriesWithSubcategories(categories);
        };

        const fetchAccounts = async () => {
            const response = await fetch("/api/accounts", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                toast.error("Failed to fetch accounts.");
                return;
            }

            const body = (await response.json()) as AccountGETResponse;
            const { accounts } = body;
            setAccounts(accounts);
        };

        fetchCategories();
        fetchAccounts();
    }, []);

    if (!accounts.length)
        return (
            <DangerButton
                className="z-40 text-xs !py-2 !px-4"
                type="button"
                disabled
            >
                Create an account first to add transactions.
            </DangerButton>
        );

    return (
        <>
            {!modalOpen && (
                <PrimaryButton
                    className="z-40 w-44"
                    type="button"
                    onClick={() => setModalOpen(true)}
                >
                    + Add Transaction
                </PrimaryButton>
            )}
            {modalOpen && (
                <>
                    <DangerButton
                        className="z-40 w-44"
                        type="button"
                        onClick={() => setModalOpen(false)}
                    >
                        Close
                    </DangerButton>
                    {/* <ClientModal setModalOpen={setModalOpen}>
                    <CreateTransaction
                            accounts={accounts}
                            categories={categoriesWithSubcategories}
                            addTransactionToList={addTransactionToList}
                            modal={modalOpen}
                            setModal={setModalOpen}
                        />
                    </ClientModal> */}
                </>
            )}
            <CreateTransaction
                accounts={accounts}
                categories={categoriesWithSubcategories}
                addTransactionToList={addTransactionToList}
                modal={modalOpen}
                setModal={setModalOpen}
            />
        </>
    );
}
