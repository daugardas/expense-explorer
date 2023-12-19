"use client";
import { useEffect, useCallback, MouseEventHandler, useRef } from "react";

export default function ClientModal({
    children,
    setModalOpen,
    className,
}: {
    children: React.ReactNode;
    setModalOpen: (open: boolean) => void;
    className?: string;
}) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const dismissModal = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

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
            className={`fixed z-20 bg-raisinBlack bg-opacity-70 w-full h-full top-0 left-0 ${
                className ?? ""
            }`}
        >
            <div className="relative w-fit m-auto mt-24">{children}</div>
        </div>
    );
}
