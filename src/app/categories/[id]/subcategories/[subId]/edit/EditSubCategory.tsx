"use client";

import { SubCategoryPUTResponse } from "@/app/api/categories/subcategories/route";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function EditSubCategory({
    originalSubCategory,
}: {
    originalSubCategory: Category;
}) {
    const [formState, setFormState] = useState<{
        id: string;
        name: string;
        description: string;
    }>({
        id: originalSubCategory.id,
        name: originalSubCategory.name,
        description: originalSubCategory.description ?? "",
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formState);
        const response = await fetch("/api/categories/subcategories", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
        });

        const body = (await response.json()) as SubCategoryPUTResponse;

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
                        value={formState.name}
                        placeholder="Food"
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
                <PrimaryButton type="submit">Save</PrimaryButton>
            </Form>
        </div>
    );
}
