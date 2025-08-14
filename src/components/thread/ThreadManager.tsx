"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
    fetchThreads,
    selectThread,
    deleteThread,
    Thread,
} from "@/redux/features/thread.slice";
import ThreadForm from "./ThreadForm";

export default function ThreadManager() {
    const dispatch = useDispatch<AppDispatch>();
    const { threads, selectedThread, loading, error } = useSelector(
        (state: RootState) => state.thread
    );

    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

    const handleDelete = async (threadId: string) => {
        if (confirm("Are you sure you want to delete this thread?")) {
            await dispatch(deleteThread(threadId));
        }
    };

    return (
        <div className="min-h-screen flex gap-6 p-6 bg-gray-950">
            {/* LEFT COLUMN */}
            <div className="w-1/3 space-y-2">
                <div className="bg-gray-900 p-4 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-emerald-400 mb-3">
                        Threads
                    </h2>
                    {loading && (
                        <p className="text-gray-400">Loading threads...</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                    <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                        {threads.map((thread) => (
                            <li
                                key={thread.id}
                                onClick={() =>
                                    dispatch(selectThread(thread.id))
                                }
                                className={`p-2 rounded-lg cursor-pointer flex justify-between items-center ${
                                    selectedThread?.id === thread.id
                                        ? "bg-emerald-800"
                                        : "hover:bg-emerald-800"
                                }`}
                            >
                                <span className="text-white">
                                    {thread.name}
                                </span>
                                <span className="text-gray-300 text-sm">
                                    {new Date(
                                        thread.createdAt
                                    ).toLocaleDateString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => setShowForm(true)}
                        className="mt-4 w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-medium"
                    >
                        + Create Thread
                    </button>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="w-2/3 bg-gray-900 p-6 rounded-xl shadow-lg">
                {/* Show form if creating or editing */}
                {showForm && (
                    <ThreadForm
                        thread={selectedThread || undefined}
                        onClose={() => setShowForm(false)}
                    />
                )}

                {!showForm && selectedThread && (
                    <div>
                        <h2 className="text-xl font-bold text-emerald-400 mb-2">
                            {selectedThread.name}
                        </h2>
                        <p className="text-gray-200">
                            {selectedThread.description || "No description"}
                        </p>

                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={() => setShowForm(true)}
                                className="py-1 px-3 rounded bg-emerald-500 hover:bg-emerald-400 text-white text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(selectedThread.id)}
                                className="py-1 px-3 rounded bg-red-600 hover:bg-red-500 text-white text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}

                {!showForm && !selectedThread && (
                    <p className="text-gray-400">
                        Select a thread or create a new one
                    </p>
                )}
            </div>
        </div>
    );
}
