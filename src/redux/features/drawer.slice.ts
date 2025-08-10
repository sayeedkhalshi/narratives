// src/store/drawerSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface DrawerState {
    drawer: {
        isOpen: boolean;
    };
}

const initialState: DrawerState = {
    drawer: {
        isOpen: false,
    },
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState: initialState,
    reducers: {
        openDrawer(state) {
            state.drawer.isOpen = true;
        },
        closeDrawer(state) {
            state.drawer.isOpen = false;
        },
        toggleDrawer(state) {
            state.drawer.isOpen = !state.drawer.isOpen;
        },
    },
});

export const { openDrawer, closeDrawer, toggleDrawer } = drawerSlice.actions;
export const selectDrawer = (state: RootState) => state.drawer.drawer;
