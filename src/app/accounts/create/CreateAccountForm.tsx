"use client";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import NumberInput from "@/app/components/Form/Inputs/NumberInput";
import TextArea from "@/app/components/Form/Inputs/TextArea";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import Option from "@/app/components/Form/Select/Option";
import Select from "@/app/components/Form/Select/Select";
import { AccountType, Currency } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateAccountForm() {
    const [formState, setFormState] = useState<{
        name: string;
        type: AccountType;
        description: string;
        currency: Currency;
        initialBalance: string;
    }>({
        name: "",
        type: AccountType.CASH,
        description: "",
        currency: Currency.EUR,
        initialBalance: "",
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // if initial balance is empty, set it to 0
        if (formState.initialBalance === "") {
            setFormState({
                ...formState,
                initialBalance: "0",
            });
        }

        const response = await fetch("/api/accounts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
        });

        const body = await response.json();

        if (response.ok) {
            setFormState({
                name: "",
                type: AccountType.CASH,
                description: "",
                currency: Currency.EUR,
                initialBalance: "",
            });
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
                        id="description"
                        value={formState.description}
                        placeholder="holds my cash.."
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                description: event.target.value,
                            });
                        }}
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

                <InputWrap>
                    <Label htmlFor="initialBalance">Initial balance</Label>
                    <NumberInput
                        id="initialBalance"
                        placeholder="0.00"
                        value={formState.initialBalance}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                initialBalance: event.target.value,
                            });
                        }}
                    />
                </InputWrap>

                <PrimaryButton type="submit">Create</PrimaryButton>
            </Form>
        </div>
    );
}
