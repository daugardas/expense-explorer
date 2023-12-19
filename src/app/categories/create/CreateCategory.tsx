"use client";

import { CategoryPOSTBody } from "@/app/api/categories/route";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import Option from "@/app/components/Form/Select/Option";
import Select from "@/app/components/Form/Select/Select";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateCategory() {
    const [formState, setFormState] = useState<CategoryPOSTBody>({
        name: "",
        description: "",
        type: CategoryType.EXPENSE,
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch("/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
        });

        const body = await response.json();
        const { message } = body;

        if (response.ok) {
            setFormState({
                name: "",
                description: "",
                type: CategoryType.EXPENSE,
            });
            toast.success(message);
            router.refresh();
        } else {
            toast.error(message);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <Form onSubmit={handleSubmit}>
                <InputWrap>
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        id="name"
                        value={formState.name}
                        placeholder="Food"
                        onChange={(event) =>
                            setFormState({
                                ...formState,
                                name: event.target.value,
                            })
                        }
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="description">Description</Label>
                    <TextInput
                        id="description"
                        value={formState.description}
                        placeholder="Groceries, restaurants, etc."
                        onChange={(event) =>
                            setFormState({
                                ...formState,
                                description: event.target.value,
                            })
                        }
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="type">Type</Label>
                    <Select
                        id="type"
                        value={formState.type}
                        onChange={(event) =>
                            setFormState({
                                ...formState,
                                type: event.target.value as CategoryType,
                            })
                        }
                    >
                        {Object.values(CategoryType).map((type) => (
                            <Option key={type} value={type}>
                                {type}
                            </Option>
                        ))}
                    </Select>
                </InputWrap>
                <PrimaryButton type="submit">Create</PrimaryButton>
            </Form>
        </div>
    );
}
