"use client";

import { CategoryPUTResponse } from "@/app/api/categories/route";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import Select from "@/app/components/Form/Select/Select";
import { CategoryType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditCategory({
    originalCategory,
}: {
    originalCategory: any;
}) {
    const [formState, setFormState] = useState<{
        id: string;
        name: string;
        type: CategoryType;
        description: string;
    }>({
        id: originalCategory.id,
        name: originalCategory.name,
        type: originalCategory.type,
        description: originalCategory.description ?? "",
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch("/api/categories", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
        });

        const body = (await response.json()) as CategoryPUTResponse;

        if (response.ok) {
            toast.success(body.message);
            router.refresh();
        } else {
            toast.error(body.message);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <Form className="!w-80" onSubmit={handleSubmit}>
                <InputWrap>
                    <Label htmlFor="name">Name</Label>
                    <TextInput
                        name="name"
                        id="name"
                        required
                        placeholder="Food"
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
                    <TextInput
                        name="description"
                        id="description"
                        value={formState.description}
                        placeholder="Groceries, restaurants, etc."
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
                        name="type"
                        id="type"
                        required
                        value={formState.type}
                        onChange={(event) => {
                            setFormState({
                                ...formState,
                                type: event.target.value as CategoryType,
                            });
                        }}
                    >
                        {Object.values(CategoryType).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </InputWrap>

                <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
        </div>
    );
}
