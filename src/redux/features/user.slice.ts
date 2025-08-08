import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../store";

interface UserState {
    user: string;
}

const initialState: UserState = {
    user: "Abu Sayeed",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<"Abu Sayeed">) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
