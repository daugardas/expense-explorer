"use client";

import InputWrap from "@/app/components/Form/InputWrap";
import NumberInput from "@/app/components/Form/Inputs/NumberInput";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TransferTransactionFormState } from "./CreateTransaction";
import AccountSelector from "./AccountSelector";
import { Account } from "@prisma/client";

export default function TransferTransactionForm({
    accounts,
    formState,
    setFormState,
}: {
    accounts: Account[];
    formState: TransferTransactionFormState;
    setFormState: (state: TransferTransactionFormState) => void;
}) {
    const [date, setDate] = useState(new Date());

    const handleFromAccountChange = (id: string) => {
        setFormState({ ...formState, fromAccountId: id });
    };

    const handleToAccountChange = (id: string) => {
        setFormState({ ...formState, toAccountId: id });
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
                <Label htmlFor="account">From account</Label>
                <AccountSelector
                    name="fromAccountId"
                    accounts={accounts}
                    selectedAccountId={formState.fromAccountId}
                    setSelectedAccountId={handleFromAccountChange}
                />
            </InputWrap>
            <InputWrap>
                <Label htmlFor="account">To account</Label>
                <AccountSelector
                    name="toAccountId"
                    accounts={accounts}
                    selectedAccountId={formState.toAccountId}
                    setSelectedAccountId={handleToAccountChange}
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
