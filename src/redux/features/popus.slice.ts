// store/slices/popupSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PopupState {
    isOpen: boolean;
    content: React.ReactNode | null;
}

const initialState: PopupState = {
    isOpen: false,
    content: null,
};

export const popupSlice = createSlice({
    name: "popup",
    initialState,
    reducers: {
        openPopup: (state, action: PayloadAction<React.ReactNode>) => {
            state.isOpen = true;
            state.content = action.payload;
        },
        closePopup: (state) => {
            state.isOpen = false;
            state.content = null;
        },
    },
});

export const { openPopup, closePopup } = popupSlice.actions;
export const selectPopup = (state: RootState) => state.popup;
