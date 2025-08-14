"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import {
    createThread,
    updateThread,
    Thread,
} from "@/redux/features/thread.slice";
import { AppDispatch } from "@/redux/store";

const threadSchema = z.object({
    name: z.string().min(3, "Thread name must be at least 3 characters"),
    description: z.string().optional(),
});

type ThreadFormValues = z.infer<typeof threadSchema>;

type ThreadFormProps = {
    thread?: Thread; // pass if editing
    onClose?: () => void; // optional callback to close form
};

export default function ThreadForm({ thread, onClose }: ThreadFormProps) {
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ThreadFormValues>({
        resolver: zodResolver(threadSchema),
        defaultValues: thread
            ? { name: thread.name, description: thread.description }
            : {},
    });

    useEffect(() => {
        if (thread) {
            reset({ name: thread.name, description: thread.description });
        }
    }, [thread, reset]);

    const onSubmit = async (data: ThreadFormValues) => {
        try {
            if (thread) {
                // Update existing thread
                await dispatch(
                    updateThread({ id: thread.id, ...data })
                ).unwrap();
            } else {
                // Create new thread
                await dispatch(createThread(data)).unwrap();
            }

            reset();
            onClose?.();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 max-w-md p-4 rounded-lg bg-gray-800"
        >
            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Name
                </label>
                <input
                    type="text"
                    {...register("name")}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                />
                {errors.name && (
                    <p className="text-red-400 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-white mb-1">
                    Description
                </label>
                <textarea
                    {...register("description")}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-emerald-400 focus:ring focus:ring-emerald-400/30"
                />
                {errors.description && (
                    <p className="text-red-400 text-sm mt-1">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 rounded bg-emerald-500 hover:bg-emerald-400 text-white font-medium disabled:opacity-60"
            >
                {isSubmitting
                    ? thread
                        ? "Updating..."
                        : "Creating..."
                    : thread
                    ? "Update Thread"
                    : "Create Thread"}
            </button>
        </form>
    );
}
