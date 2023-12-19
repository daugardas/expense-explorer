"use client";

import InputWrap from "@/app/components/Form/InputWrap";
import NumberInput from "@/app/components/Form/Inputs/NumberInput";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import TransactionCategorySelect from "./TransactionCategorySelect";
import { CategoryWithSubcategories } from "@/lib/types";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { ExpenseTransactionFormState } from "./CreateTransaction";
import AccountSelector from "./AccountSelector";
import { Account } from "@prisma/client";

export default function ExpenseTransactionForm({
    categoriesWithSubcategories,
    accounts,
    formState,
    setFormState,
}: {
    categoriesWithSubcategories: CategoryWithSubcategories[];
    accounts: Account[];
    formState: ExpenseTransactionFormState;
    setFormState: (state: ExpenseTransactionFormState) => void;
}) {
    const [date, setDate] = useState(new Date());

    const handleCategoryChange = (id: string) => {
        setFormState({ ...formState, categoryId: id });
    };

    const handleAccountChange = (id: string) => {
        setFormState({ ...formState, accountId: id });
    };

    const handleAmountChange = (amount: number) => {
        setFormState({ ...formState, amount });
    };

    const handleNoteChange = (note: string) => {
        setFormState({ ...formState, note });
    };

    const handledateChange = (date: Date) => {
        setDate(date);
        setFormState({ ...formState, date });
    };

    return (
        <>
            <InputWrap>
                <Label htmlFor="account">Account</Label>
                <AccountSelector
                    name="accountId"
                    accounts={accounts}
                    selectedAccountId={formState.accountId}
                    setSelectedAccountId={handleAccountChange}
                />
            </InputWrap>
            <InputWrap>
                <Label htmlFor="category">Category</Label>
                <TransactionCategorySelect
                    categoriesWithSubcategories={categoriesWithSubcategories}
                    selectedCategoryId={formState.categoryId}
                    setSelectedCategoryId={handleCategoryChange}
                />
            </InputWrap>
            <InputWrap>
                <Label htmlFor="date">Date</Label>
                <DatePicker
                    selected={date}
                    onChange={(d) => handledateChange(d ?? new Date())}
                />
            </InputWrap>
            <InputWrap>
                <Label htmlFor="amount">Amount</Label>
                <NumberInput
                    id="amount"
                    name="amount"
                    value={formState.amount}
                    onChange={(e) => handleAmountChange(Number(e.target.value))}
                />
            </InputWrap>
            <InputWrap>
                <Label htmlFor="note">Note</Label>
                <TextInput
                    id="note"
                    name="note"
                    value={formState.note}
                    onChange={(e) => handleNoteChange(e.target.value)}
                />
            </InputWrap>
        </>
    );
}
