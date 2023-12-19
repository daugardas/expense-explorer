"use client";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, MouseEventHandler, useRef } from "react";

export default function ServerModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const dismissModal = useCallback(() => {
        router.back();
    }, [router]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                dismissModal();
            }
        },
        [dismissModal]
    );

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlayRef.current && dismissModal) {
                dismissModal();
            }
        },
        [dismissModal, overlayRef]
    );

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    return (
        <div
            ref={overlayRef}
            onClick={onClick}
            className="fixed bg-raisinBlack bg-opacity-70 w-full h-full top-0 left-0 flex justify-center items-center"
        >
            <div className="w-fit bg-white">{children}</div>
        </div>
    );
}
