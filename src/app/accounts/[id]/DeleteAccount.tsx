"use client";
import DangerButton from "@/app/components/Buttons/DangerButton";
import SecondaryButton from "@/app/components/Buttons/SecondaryButton";
import ClientModal from "@/app/components/ClientModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteAccount({
    id,
    hasTransactions,
}: {
    id: string;
    hasTransactions: boolean;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        const response = await fetch("/api/accounts", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

        if (response.ok) {
            console.log("Account deleted");
            setModalOpen(false);
            router.replace("/accounts", {
                scroll: false,
            });
            //router.push("/accounts");
        } else {
            console.log("Account deletion failed");
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
                                    You can&apos;t delete this account because
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
                                    account?
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
