"use client";
import React from "react";
import { useDispatch } from "react-redux";
import {
    updateSlot,
    removeSlot,
    OptionalParam,
    RoutineSlotData,
} from "@/redux/features/routine.slice";
import { AppDispatch } from "@/redux/store";
import OpenDrawer from "../drawer/OpenDrawer";

interface Props {
    slot: RoutineSlotData;
}

export default function RoutineSlot({ slot }: Props) {
    const dispatch = useDispatch<AppDispatch>();

    function onFieldChange<K extends keyof RoutineSlotData>(
        field: K,
        value: RoutineSlotData[K]
    ) {
        dispatch(updateSlot({ id: slot.id, data: { [field]: value } }));
    }

    // Render names of all optional params if set
    const optionalParams = [
        "thread",
        "term",
        "activity",
        "project",
        "task",
        "todo",
    ] as const;

    return (
        <div className="border p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Routine Slot</h3>
                <button
                    onClick={() => dispatch(removeSlot(slot.id))}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove slot"
                    type="button"
                >
                    ×
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <OpenDrawer />

                <input
                    placeholder="Title"
                    value={slot.title ?? ""}
                    onChange={(e) => onFieldChange("title", e.target.value)}
                    className="border p-2 rounded"
                />
                <textarea
                    placeholder="Content"
                    value={slot.content ?? ""}
                    onChange={(e) => onFieldChange("content", e.target.value)}
                    className="border p-2 rounded"
                />

                {/* For demo, we use simple text inputs for optional params names & ids */}
                {optionalParams.map((param) => (
                    <div key={param} className="flex gap-2 items-center">
                        <input
                            placeholder={`${param} id`}
                            value={slot[param]?.id ?? ""}
                            onChange={(e) =>
                                onFieldChange(param, {
                                    id: e.target.value,
                                    name: slot[param]?.name ?? "",
                                })
                            }
                            className="border p-1 rounded w-24"
                        />
                        <input
                            placeholder={`${param} name`}
                            value={slot[param]?.name ?? ""}
                            onChange={(e) =>
                                onFieldChange(param, {
                                    id: slot[param]?.id ?? "",
                                    name: e.target.value,
                                })
                            }
                            className="border p-1 rounded flex-1"
                        />
                    </div>
                ))}
            </div>

            {/* Show names of optional params that have a value */}
            <div className="mt-2 text-sm text-gray-600">
                {optionalParams.map((param) =>
                    slot[param] && slot[param]?.name ? (
                        <span
                            key={param}
                            className="mr-2 inline-block rounded bg-gray-200 px-2 py-1"
                        >
                            {slot[param]?.name}
                        </span>
                    ) : null
                )}
            </div>
        </div>
    );
}
