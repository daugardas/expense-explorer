"use client";

import { SubCategoryDELETEResponse } from "@/app/api/categories/subcategories/route";
import DangerButton from "@/app/components/Buttons/DangerButton";
import SecondaryButton from "@/app/components/Buttons/SecondaryButton";
import ClientModal from "@/app/components/ClientModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteSubCategory({
    parentId,
    subId,
    hasTransactions,
}: {
    parentId: string;
    subId: string;
    hasTransactions: boolean;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const response = await fetch("/api/categories/subcategories", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: subId }),
        });

        const body = (await response.json()) as SubCategoryDELETEResponse;

        if (response.ok) {
            toast.success(body.message);
            setModalOpen(false);
            router.replace("/categories/" + parentId, {
                scroll: false,
            });
        } else {
            toast.error(body.message);
        }
    };

    return (
        <>
            <DangerButton onClick={() => setModalOpen(true)}>
                Delete
            </DangerButton>
            {modalOpen && (
                <ClientModal setModalOpen={setModalOpen}>
                    <div className="fixed bg-raisinBlackDarkest text-white py-3 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                        {hasTransactions ? (
                            <>
                                <p>
                                    You can&apos;t delete this category because
                                    there are transactions associated with it.
                                </p>
                                <div className="flex flex-auto justify-center gap-5 mt-6">
                                    <SecondaryButton
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>
                                    Are you sure you want to delete this
                                    category?
                                </p>
                                <div className="flex flex-auto justify-center gap-5 mt-6">
                                    <SecondaryButton
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </SecondaryButton>
                                    <DangerButton onClick={handleDelete}>
                                        Delete
                                    </DangerButton>
                                </div>
                            </>
                        )}
                    </div>
                </ClientModal>
            )}
        </>
    );
}
