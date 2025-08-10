"use client";
// src/components/design/RightSideDrawer.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store"; // adjust to your root reducer type
import { closeDrawer } from "@/redux/features/drawer.slice"; // adjust to your slice file path

export default function RightSideDrawer() {
    const isOpen = useSelector(
        (state: RootState) => state.drawer.drawer.isOpen
    );
    const dispatch = useDispatch();

    // Close drawer when clicking on the backdrop
    const handleClose = () => {
        dispatch(closeDrawer());
    };

    return (
        <>
            {/* Backdrop */}
            <div
                data-testid="drawer-backdrop"
                className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <aside
                role="complementary"
                className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          w-1/2
          z-50
        `}
            >
                {/* Your drawer content here */}
                <div className="p-6">
                    <button
                        className="mb-4 text-gray-600 hover:text-gray-900"
                        onClick={handleClose}
                        aria-label="Close drawer"
                    >
                        Close
                    </button>
                    <div>
                        {/* Put your drawer content here */}
                        <p>This is the drawer content.</p>
                    </div>
                </div>
            </aside>
        </>
    );
}
