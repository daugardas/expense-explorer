"use client";

import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import TextArea from "@/app/components/Form/Inputs/TextArea";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import Option from "@/app/components/Form/Select/Option";
import Select from "@/app/components/Form/Select/Select";
import { Account, AccountType, Currency } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditAccountForm({
    originalAccount,
}: {
    originalAccount: Account;
}) {
    const [formState, setFormState] = useState<{
        id: string;
        name: string;
        type: AccountType;
        description: string;
        currency: Currency;
    }>({
        id: originalAccount.id,
        name: originalAccount.name,
        type: originalAccount.type,
        description: originalAccount.description ?? "",
        currency: originalAccount.currency,
    });
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("/api/accounts", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        });

        const body = await response.json();

        if (response.ok) {
            toast.success(body.message);
            router.refresh();
        } else {
            toast.error(body.message);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <Form onSubmit={handleSubmit}>
                <InputWrap>
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        name="name"
                        id="name"
                        required
                        placeholder="My wallet"
                        value={formState.name}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                name: event.target.value,
                            });
                        }}
                    />
                </InputWrap>

                <InputWrap>
                    <Label htmlFor="description">Description</Label>
                    <TextArea
                        name="description"
                        id="description"
                        placeholder="holds my cash.."
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                description: event.target.value,
                            });
                        }}
                        value={formState.description}
                    />
                </InputWrap>

                <InputWrap>
                    <Label htmlFor="type">Type</Label>
                    <Select
                        id="type"
                        required
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                type: event.target.value as AccountType,
                            });
                        }}
                        value={formState.type}
                    >
                        {Object.values(AccountType).map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                        id="currency"
                        required
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                currency: event.target.value as Currency,
                            });
                        }}
                        value={formState.currency}
                    >
                        {Object.values(Currency).map((currency) => (
                            <Option key={currency} value={currency}>
                                {currency}
                            </Option>
                        ))}
                    </Select>
                </InputWrap>

                <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
        </div>
    );
}
