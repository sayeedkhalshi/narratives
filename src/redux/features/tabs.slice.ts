import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";
import { RootState } from "../store";

export interface TabData {
    id: string;
    title: string;
    content: ReactNode;
}

interface TabsState {
    tabs: TabData[];
    activeTabId: string | null;
}

const initialState: TabsState = {
    tabs: [],
    activeTabId: null,
};

export const tabsSlice = createSlice({
    name: "tabs",
    initialState,
    reducers: {
        addTab: (
            state,
            action: PayloadAction<{ title: string; content: ReactNode }>
        ) => {
            const newTab: TabData = {
                id: crypto.randomUUID(),
                title: action.payload.title,
                content: action.payload.content,
            };
            state.tabs.push(newTab);
            state.activeTabId = newTab.id;
        },
        removeTab: (state, action: PayloadAction<string>) => {
            state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
            if (state.activeTabId === action.payload) {
                state.activeTabId = state.tabs.length ? state.tabs[0].id : null;
            }
        },
        setActiveTab: (state, action: PayloadAction<string>) => {
            state.activeTabId = action.payload;
        },
        resetTabs: () => initialState,
    },
});

export const { addTab, removeTab, setActiveTab, resetTabs } = tabsSlice.actions;
export const selectTabs = (state: RootState) => state.tabs.tabs;
