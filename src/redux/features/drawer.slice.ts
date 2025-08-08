import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

enum Drawer {
    CreateTermDrawer,
}

interface DrawerState {
    drawer: {
        type: Drawer;
        isOpen: boolean;
    };
}

const initialState: DrawerState = {
    drawer: {
        type: Drawer.CreateTermDrawer,
        isOpen: false,
    },
};

export const drawerSlice = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        toggleTermDrawer(state, action: PayloadAction<DrawerState["drawer"]>) {
            state.drawer.type = action.payload.type;
            state.drawer.isOpen = action.payload.isOpen;
        },
    },
});

export const { toggleTermDrawer } = drawerSlice.actions;
export const selectDrawer = (state: RootState) => state.drawer.drawer;
