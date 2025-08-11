import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface OptionalParam {
    id: string;
    name: string;
}

export interface RoutineSlotData {
    id: string;
    title?: string;
    content?: string;
    thread?: OptionalParam | null;
    term?: OptionalParam | null;
    activity?: OptionalParam | null;
    project?: OptionalParam | null;
    task?: OptionalParam | null;
    todo?: OptionalParam | null;
}

interface RoutineState {
    slots: RoutineSlotData[];
}

const initialState: RoutineState = {
    slots: [],
};

export const routineSlice = createSlice({
    name: "routine",
    initialState,
    reducers: {
        addSlot: (state) => {
            state.slots.push({
                id: crypto.randomUUID(),
                title: "",
                content: "",
                thread: null,
                term: null,
                activity: null,
                project: null,
                task: null,
                todo: null,
            });
        },
        updateSlot: (
            state,
            action: PayloadAction<{
                id: string;
                data: Partial<RoutineSlotData>;
            }>
        ) => {
            const slot = state.slots.find((s) => s.id === action.payload.id);
            if (slot) {
                Object.assign(slot, action.payload.data);
            }
        },
        removeSlot: (state, action: PayloadAction<string>) => {
            state.slots = state.slots.filter((s) => s.id !== action.payload);
        },
    },
});

export const { addSlot, updateSlot, removeSlot } = routineSlice.actions;
export default routineSlice.reducer;
export const selectRoutineSlots = (state: RootState) => state.routine.slots;
