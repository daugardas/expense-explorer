"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import DangerButton from "../components/Buttons/DangerButton";
import SecondaryButton from "../components/Buttons/SecondaryButton";
import ClientModal from "../components/ClientModal";

export default function DeleteTransaction({
    id,
    closeEditModal,
    deleteFromClientTransactionList,
}: {
    id: string;
    closeEditModal: () => void;
    deleteFromClientTransactionList: (id: string) => void;
}) {
    const [modalOpen, setModalOpen] = useState(false);

    const handleDelete = async () => {
        const response = await fetch("/api/transactions", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        const body = await response.json();

        if (response.ok) {
            toast.success(body.message);
            setModalOpen(false);
        } else {
            toast.error(body.message);
        }

        deleteFromClientTransactionList(id);
        closeEditModal();
    };

    return (
        <>
            <DangerButton type="button" onClick={() => setModalOpen(true)}>
                Delete
            </DangerButton>
            {modalOpen && (
                <ClientModal setModalOpen={setModalOpen}>
                    <div className="fixed bg-raisinBlackDarkest text-white py-3 px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg">
                        <p>Are you sure you want to delete this transaction?</p>
                        <div className="flex flex-auto justify-center gap-5 mt-6">
                            <SecondaryButton
                                type="button"
                                onClick={() => setModalOpen(false)}
                            >
                                Cancel
                            </SecondaryButton>
                            <DangerButton type="button" onClick={handleDelete}>
                                Delete
                            </DangerButton>
                        </div>
                    </div>
                </ClientModal>
            )}
        </>
    );
}
