"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import RoutineSlot from "./RoutineSlot";
import { RootState, AppDispatch } from "@/redux/store";
import { addSlot } from "@/redux/features/routine.slice";

export default function Routine() {
    const slots = useSelector((state: RootState) => state.routine.slots);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Routine</h2>
            <button
                onClick={() => dispatch(addSlot())}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                type="button"
            >
                Add Routine Slot
            </button>

            {slots.length === 0 && (
                <p className="text-gray-500">
                    No routine slots. Click Add Routine Slot to create one.
                </p>
            )}

            {slots.map((slot) => (
                <RoutineSlot key={slot.id} slot={slot} />
            ))}
        </div>
    );
}
