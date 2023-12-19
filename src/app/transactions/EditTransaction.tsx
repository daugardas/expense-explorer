import {
    CategoryWithSubcategories,
    TransactionWithCategory,
} from "@/lib/types";
import ClientModal from "../components/ClientModal";
import Form from "../components/Form/Form";
import { Account, TransactionType } from "@prisma/client";
import { useState } from "react";
import TransactionTypeSelector from "./TransactionTypeSelector";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import InputWrap from "../components/Form/InputWrap";
import Label from "../components/Form/Label";
import AccountSelector from "./AccountSelector";
import TransactionCategorySelect from "./TransactionCategorySelect";
import TextInput from "../components/Form/Inputs/TextInput";
import { toast } from "react-toastify";
import {
    ExpensePutErrorResponse,
    ExpensePutResponse,
} from "../api/transactions/expense/route";
import {
    IncomePutErrorResponse,
    IncomePutResponse,
} from "../api/transactions/income/route";
import {
    TransferPutErrorResponse,
    TransferPutResponse,
} from "../api/transactions/transfer/route";
import DateInput from "../components/Form/Inputs/DateInput";
import DeleteTransaction from "./DeleteTransaction";

type FormState = {
    fromAccountId: string;
    toAccountId: string | null;
    incomeCategoryId: string | null;
    expenseCategoryId: string | null;
    date: Date;
    amount: string; // seting this to string, so the user input is more convienient
    note: string | null;
};

export default function EditTransaction({
    transaction,
    accounts,
    categories,
    setEditTransactionId,
    handleEditTransaction,
    handleDeleteTransaction,
}: {
    transaction: TransactionWithCategory;
    accounts: Account[];
    categories: CategoryWithSubcategories[];
    setEditTransactionId: (id: string) => void;
    handleEditTransaction: (transaction: TransactionWithCategory) => void;
    handleDeleteTransaction: (id: string) => void;
}) {
    const [type, setType] = useState<TransactionType>(transaction.type);

    const [formState, setFormState] = useState<FormState>({
        fromAccountId: transaction.fromAccountId,
        toAccountId: transaction.toAccountId,
        incomeCategoryId:
            transaction.type === TransactionType.INCOME
                ? transaction.category?.id || null
                : null,
        expenseCategoryId:
            transaction.type === TransactionType.EXPENSE
                ? transaction.category?.id || null
                : null,
        date: transaction.date,
        amount: transaction.amount.toString(),
        note: transaction.note,
    });

    const closeModal = () => {
        setEditTransactionId("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const amount = parseFloat(formState.amount);
        if (isNaN(amount)) {
            toast.error("Amount is not a number");
            return;
        }

        if (type === TransactionType.EXPENSE) {
            const response = await fetch("/api/transactions/expense", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: transaction.id,
                    accountId: formState.fromAccountId,
                    categoryId: formState.expenseCategoryId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                }),
            });

            const body = await response.json();

            if (!response.ok) {
                console.error((body as ExpensePutErrorResponse).message);
                toast.error("Failed to update transaction.");
                return;
            }

            const updatedTransaction = (body as ExpensePutResponse).transaction;
            handleEditTransaction(updatedTransaction);
        } else if (type === TransactionType.INCOME) {
            const response = await fetch("/api/transactions/income", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: transaction.id,
                    accountId: formState.toAccountId,
                    categoryId: formState.incomeCategoryId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                }),
            });

            const body = await response.json();

            if (!response.ok) {
                console.error((body as IncomePutErrorResponse).message);
                toast.error("Failed to update transaction.");
                return;
            }

            const updatedTransaction = (body as IncomePutResponse).transaction;
            handleEditTransaction(updatedTransaction);
        } else {
            const response = await fetch("/api/transactions/transfer", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transactionId: transaction.id,
                    fromAccountId: formState.fromAccountId,
                    toAccountId: formState.toAccountId,
                    date: formState.date,
                    amount,
                    note: formState.note,
                }),
            });

            const body = await response.json();

            if (!response.ok) {
                console.error((body as TransferPutErrorResponse).message);
                toast.error("Failed to update transaction.");
                return;
            }

            const updatedTransaction = (body as TransferPutResponse)
                .transaction;
            handleEditTransaction(updatedTransaction);
        }
    };

    const checkIfChanged = () => {
        if (type !== transaction.type) return true;
        if (formState.fromAccountId !== transaction.fromAccountId) return true;
        if (formState.toAccountId !== transaction.toAccountId) return true;
        if (
            formState.incomeCategoryId !== (transaction.category?.id || null) &&
            type === TransactionType.INCOME
        )
            return true;
        if (formState.date !== transaction.date) return true;
        if (formState.amount !== transaction.amount.toString()) return true;
        if (formState.note !== transaction.note) return true;
        return false;
    };

    const changed = checkIfChanged();

    const incomeCategories = categories.filter(
        (cat) => cat.type === TransactionType.INCOME
    );

    const expenseCategories = categories.filter(
        (cat) => cat.type === TransactionType.EXPENSE
    );

    return (
        <ClientModal setModalOpen={closeModal} className="!z-50">
            <Form className="bg-white rounded-lg p-5" onSubmit={handleSubmit}>
                <h1 className="font-bold text-center text-xl">
                    Editing transaction
                </h1>

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
                    <DeleteTransaction
                        id={transaction.id}
                        closeEditModal={closeModal}
                        deleteFromClientTransactionList={
                            handleDeleteTransaction
                        }
                    />
                    <SecondaryButton type="button" onClick={closeModal}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton type="submit" disabled={!changed}>
                        Save
                    </PrimaryButton>
                </div>
            </Form>
        </ClientModal>
    );
}
