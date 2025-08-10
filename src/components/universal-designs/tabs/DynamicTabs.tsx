"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { addTab, removeTab, setActiveTab } from "@/redux/features/tabs.slice";

export default function DynamicTabs() {
    const { tabs, activeTabId } = useSelector((state: RootState) => state.tabs);
    const dispatch = useDispatch<AppDispatch>();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAddTab = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        dispatch(addTab({ title, content: <p>{content}</p> }));
        setTitle("");
        setContent("");
    };

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-300">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`flex items-center px-4 py-2 cursor-pointer ${
                            activeTabId === tab.id
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-600 hover:text-gray-800"
                        }`}
                        onClick={() => dispatch(setActiveTab(tab.id))}
                    >
                        <span>{tab.title}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                dispatch(removeTab(tab.id));
                            }}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            {/* Tab Content */}
            <div className="p-4">
                {tabs.find((tab) => tab.id === activeTabId)?.content || (
                    <p className="text-gray-500 text-sm">No tab selected.</p>
                )}
            </div>

            {/* Add Tab Form */}
            <form
                onSubmit={handleAddTab}
                className="mt-4 flex flex-col gap-2 border-t pt-4"
            >
                <input
                    type="text"
                    placeholder="Tab title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="Tab content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="self-start px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Tab
                </button>
            </form>
        </div>
    );
}
