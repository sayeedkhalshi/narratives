// components/TimeOfDayList.tsx
"use client";
import React from "react";
import { timePeriods } from "./timePeriods";

export default function TimeOfDay() {
    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-400 mb-1 text-center">
                Times of Day
            </h2>
            <ul className="space-y-1">
                {timePeriods.map((period) => (
                    <li
                        key={period.name}
                        className="flex justify-between items-center p-1 rounded-lg bg-gray-800 hover:bg-emerald-900 transition-colors shadow-sm"
                    >
                        <span className="font-medium text-white">
                            {period.name}
                        </span>
                        <span className="text-gray-300">{period.time}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
