"use client";

import { SubCategoryPOSTBody } from "@/app/api/categories/subcategories/route";
import PrimaryButton from "@/app/components/Buttons/PrimaryButton";
import Form from "@/app/components/Form/Form";
import InputWrap from "@/app/components/Form/InputWrap";
import TextInput from "@/app/components/Form/Inputs/TextInput";
import Label from "@/app/components/Form/Label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateSubCategory({ id }: { id: string }) {
    const [formState, setFormState] = useState<SubCategoryPOSTBody>({
        parentId: id,
        name: "",
        description: "",
    });

    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await fetch("/api/categories/subcategories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
        });

        const body = await response.json();
        const { message } = body;

        if (response.ok) {
            setFormState({
                parentId: id,
                name: "",
                description: "",
            });
            toast.success(message);
            router.refresh();
        } else {
            toast.error(message);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <InputWrap>
                <Label htmlFor="name">Name</Label>
                <TextInput
                    id="name"
                    placeholder="Groceries..."
                    value={formState.name}
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
                    placeholder="groceries from the supermarket"
                    value={formState.description}
                    onChange={(event) =>
                        setFormState({
                            ...formState,
                            description: event.target.value,
                        })
                    }
                />
            </InputWrap>
            <PrimaryButton type="submit">Create</PrimaryButton>
        </Form>
    );
}
