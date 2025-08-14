// components/Popup.tsx
"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closePopup } from "@/redux/features/popus.slice";

export default function Popup() {
    const dispatch = useDispatch();
    const { isOpen, content } = useSelector((state: RootState) => state.popup);

    if (!isOpen) return null;

    return (
        <div className="fixed scroll-auto inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={() => dispatch(closePopup())}
            ></div>

            {/* Popup box */}
            <div className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                <button
                    onClick={() => dispatch(closePopup())}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    ✕
                </button>
                {content}
            </div>
        </div>
    );
}
