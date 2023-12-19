"use client";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import { Account, TransactionType } from "@prisma/client";
import TransactionTypeSelector from "./TransactionTypeSelector";
import { useState } from "react";
import {
    CategoryWithSubcategories,
    TransactionWithCategory,
} from "@/lib/types";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    ExpensePostBody,
    ExpensePostErrorResponse,
    ExpensePostResponse,
} from "../api/transactions/expense/route";
import {
    IncomePostBody,
    IncomePostErrorResponse,
    IncomePostResponse,
} from "../api/transactions/income/route";
import {
    TransferPostBody,
    TransferPostErrorResponse,
    TransferPostResponse,
} from "../api/transactions/transfer/route";
import ClientModal from "../components/ClientModal";
import Label from "../components/Form/Label";
import AccountSelector from "./AccountSelector";
import TransactionCategorySelect from "./TransactionCategorySelect";
import DateInput from "../components/Form/Inputs/DateInput";
import TextInput from "../components/Form/Inputs/TextInput";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import PrimaryButton from "../components/Buttons/PrimaryButton";

type FormState = {
    fromAccountId: string;
    toAccountId: string | null;
    incomeCategoryId: string | null;
    expenseCategoryId: string | null;
    date: Date;
    amount: string; // seting this to string, so the user input is more convienient
    note: string | null;
};

export default function CreateTransaction({
    accounts,
    categories,
    addTransactionToList,
    modal,
    setModal,
}: {
    accounts: Account[];
    categories: CategoryWithSubcategories[];
    addTransactionToList: (transaction: TransactionWithCategory) => void;
    modal: boolean;
    setModal: (modal: boolean) => void;
}) {
    const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
    const defaultExpenseCategory = categories.find(
        (cat) => cat.type === TransactionType.EXPENSE
    );
    const defaultIncomeCategory = categories.find(
        (cat) => cat.type === TransactionType.INCOME
    );
    const [formState, setFormState] = useState<FormState>({
        fromAccountId: accounts[0].id,
        toAccountId: accounts[0].id,
        incomeCategoryId: defaultIncomeCategory?.id || "",
        expenseCategoryId: defaultExpenseCategory?.id || "",
        date: new Date(),
        amount: "",
        note: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const amount = parseFloat(formState.amount);
        if (isNaN(amount)) {
            toast.error("Amount is not a number");
            return;
        }

        if (type === TransactionType.EXPENSE) {
            const response = await fetch("/api/transactions/expense", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accountId: formState.fromAccountId,
                    categoryId: formState.expenseCategoryId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                } as ExpensePostBody),
            });

            const body = await response.json();

            if (!response.ok) {
                console.error((body as ExpensePostErrorResponse).message);
                toast.error("Failed to create transaction.");
                return;
            }

            const createdTransaction = (body as ExpensePostResponse)
                .transaction;
            addTransactionToList(createdTransaction);
            return;
        }

        if (type === TransactionType.INCOME) {
            const response = await fetch("/api/transactions/income", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    accountId: formState.toAccountId,
                    categoryId: formState.incomeCategoryId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                } as IncomePostBody),
            });

            const body = await response.json();

            if (!response.ok) {
                toast.error(
                    "Failed to create transaction. Check console for details."
                );
                console.error((body as IncomePostErrorResponse).message);
                return;
            }
            const createdTransaction = (body as IncomePostResponse).transaction;
            addTransactionToList(createdTransaction);
            return;
        }

        if (type === TransactionType.TRANSFER) {
            const response = await fetch("/api/transactions/transfer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fromAccountId: formState.fromAccountId,
                    toAccountId: formState.toAccountId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                } as TransferPostBody),
            });

            const body = await response.json();

            if (!response.ok) {
                toast.error(
                    "Failed to create transaction. Check console for details."
                );
                console.error((body as TransferPostErrorResponse).message);
                return;
            }

            const createdTransaction = (body as TransferPostResponse)
                .transaction;

            addTransactionToList(createdTransaction);
        }
    };

    const incomeCategories = categories.filter(
        (cat) => cat.type === TransactionType.INCOME
    );

    const expenseCategories = categories.filter(
        (cat) => cat.type === TransactionType.EXPENSE
    );

    return modal ? (
        <ClientModal setModalOpen={setModal}>
            <Form className="bg-white rounded-lg p-5" onSubmit={handleSubmit}>
                <TransactionTypeSelector
                    selectedType={type}
                    setType={setType}
                />

                {(type === TransactionType.EXPENSE ||
                    type === TransactionType.TRANSFER) && (
                    <InputWrap>
                        <Label htmlFor="account" className="font-bold">
                            From account
                        </Label>
                        <AccountSelector
                            name="fromAccountId"
                            accounts={accounts}
                            selectedAccountId={formState.fromAccountId}
                            setSelectedAccountId={(id) =>
                                setFormState({
                                    ...formState,
                                    fromAccountId: id,
                                })
                            }
                        />
                    </InputWrap>
                )}

                {(type === TransactionType.EXPENSE ||
                    type === TransactionType.INCOME) && (
                    <InputWrap>
                        <Label htmlFor="category" className="font-bold">
                            {type === TransactionType.EXPENSE
                                ? "To category"
                                : "From category"}
                        </Label>
                        <TransactionCategorySelect
                            categoriesWithSubcategories={
                                type === TransactionType.EXPENSE
                                    ? expenseCategories
                                    : incomeCategories
                            }
                            selectedCategoryId={
                                type === TransactionType.EXPENSE
                                    ? formState.expenseCategoryId
                                    : formState.incomeCategoryId
                            }
                            setSelectedCategoryId={(id) =>
                                setFormState({
                                    ...formState,
                                    ...(type === TransactionType.EXPENSE
                                        ? { expenseCategoryId: id }
                                        : { incomeCategoryId: id }),
                                })
                            }
                        />
                    </InputWrap>
                )}

                {(type === TransactionType.TRANSFER ||
                    type === TransactionType.INCOME) && (
                    <InputWrap>
                        <Label htmlFor="account" className="font-bold">
                            To account
                        </Label>
                        <AccountSelector
                            name="toAccountId"
                            accounts={accounts}
                            selectedAccountId={formState.toAccountId}
                            setSelectedAccountId={(id) =>
                                setFormState({
                                    ...formState,
                                    toAccountId: id,
                                })
                            }
                        />
                    </InputWrap>
                )}

                <InputWrap>
                    <Label htmlFor="date" className="font-bold">
                        Date
                    </Label>
                    <DateInput
                        placeholder="YYYY-MM-DD"
                        selected={formState.date}
                        onChange={(d: Date) =>
                            setFormState({ ...formState, date: d })
                        }
                    />
                </InputWrap>

                <InputWrap>
                    <Label htmlFor="amount" className="font-bold">
                        Amount
                    </Label>
                    <TextInput
                        id="amount"
                        name="amount"
                        placeholder="0.00"
                        value={formState.amount}
                        onChange={(e) => {
                            // only allow numbers, dots, commas and empty string. There can only be one dot or comma
                            const regex = /^-?\d*([.,]\d*)?$/;

                            if (!regex.test(e.target.value)) return;
                            setFormState({
                                ...formState,
                                amount: e.target.value,
                            });
                        }}
                    />
                </InputWrap>

                <InputWrap>
                    <Label htmlFor="note" className="font-bold">
                        Note
                    </Label>
                    <TextInput
                        id="note"
                        name="note"
                        placeholder="Bought chocolate.."
                        value={formState.note ?? ""}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                note: e.target.value,
                            })
                        }
                    />
                </InputWrap>

                <div className="flex flex-row gap-2 justify-between items-center">
                    <SecondaryButton
                        type="button"
                        onClick={() => setModal(false)}
                    >
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton type="submit">Create</PrimaryButton>
                </div>
            </Form>
        </ClientModal>
    ) : null;
}
