"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeDrawer } from "@/redux/features/drawer.slice";
import DynamicTabs from "../tabs/DynamicTabs";

export default function RightSideDrawer() {
    const isOpen = useSelector(
        (state: RootState) => state.drawer.drawer.isOpen
    );
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeDrawer());
    };

    return (
        <aside
            role="complementary"
            className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "translate-x-full"}
                w-1/2
                z-50
            `}
        >
            <div className="p-6">
                <button
                    className="mb-4 text-gray-600 hover:text-gray-900"
                    onClick={handleClose}
                    aria-label="Close drawer"
                >
                    Close
                </button>
                <div>
                    <p>This is the drawer content.</p>
                    <DynamicTabs />
                </div>
            </div>
        </aside>
    );
}
