// components/GreenPlusButton.tsx
"use client";
import React from "react";

type Size = "sm" | "md" | "lg";

type Props = {
    onClick?: () => void;
    ariaLabel?: string; // Screen-reader label (defaults to "Add")
    className?: string; // Extra utility classes
    size?: Size; // sm | md | lg
    fab?: boolean; // true = circular FAB style
    disabled?: boolean;
};

const sizeMap: Record<Size, string> = {
    sm: "h-10 w-10 text-lg", // slightly larger than before
    md: "h-14 w-14 text-2xl", // bumped up
    lg: "h-20 w-20 text-4xl", // much bigger for a FAB feel
};

export default function GreenPlusButton({
    onClick,
    ariaLabel = "Add",
    className = "",
    size = "md",
    fab = true,
    disabled = false,
}: Props) {
    const base =
        "group relative inline-flex items-center justify-center overflow-hidden " +
        "rounded-full select-none transition-all duration-200 ease-out " +
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 " +
        "disabled:opacity-60 disabled:cursor-not-allowed";
    const shape = fab ? "rounded-full" : "rounded-xl px-4";
    const dims = fab ? sizeMap[size] : "h-11 text-base";
    const padding = fab ? "" : "gap-2";
    const press = "active:scale-95 hover:shadow-emerald-500/30";
    const bg =
        "bg-gradient-to-b from-emerald-400 to-emerald-600 " +
        "hover:from-emerald-300 hover:to-emerald-600 " +
        "text-white shadow-lg shadow-emerald-600/25";

    return (
        <button
            type="button"
            aria-label={ariaLabel}
            onClick={onClick}
            disabled={disabled}
            className={[base, shape, dims, padding, press, bg, className].join(
                " "
            )}
        >
            {/* subtle glossy highlight */}
            <span className="pointer-events-none absolute inset-0 opacity-60">
                <span className="absolute -top-1 left-0 right-0 h-1/2 bg-white/10" />
            </span>

            {/* plus icon (no libs) */}
            <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={
                    "h-[1.4em] w-[1.4em] transition-transform duration-200 " +
                    "group-hover:rotate-90"
                }
            >
                <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2.5" // thicker for visibility at larger size
                    strokeLinecap="round"
                />
            </svg>

            {/* optional label if not FAB */}
            {!fab && <span className="font-medium">Add</span>}

            {/* soft ring glow */}
            <span className="pointer-events-none absolute inset-0 rounded-inherit ring-1 ring-white/10" />
        </button>
    );
}
