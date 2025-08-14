// store/threadSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Thread = {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
};

export type ThreadState = {
    threads: Thread[];
    selectedThread: Thread | null;
    loading: boolean;
    error: string | null;
};

const initialState: ThreadState = {
    threads: [],
    selectedThread: null,
    loading: false,
    error: null,
};

// Async thunk to fetch threads from API
export const fetchThreads = createAsyncThunk<Thread[]>(
    "thread/fetchThreads",
    async () => {
        const res = await fetch("/api/thread");
        if (!res.ok) throw new Error("Failed to fetch threads");
        return res.json();
    }
);

// Async thunk to create a new thread
export const createThread = createAsyncThunk<
    Thread,
    { name: string; description?: string }
>("thread/createThread", async (data) => {
    const res = await fetch("/api/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create thread");
    return res.json();
});

// Async thunk to update a thread
export const updateThread = createAsyncThunk<
    Thread,
    { id: string; name: string; description?: string }
>("thread/updateThread", async ({ id, name, description }) => {
    const res = await fetch(`/api/thread/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
    });
    if (!res.ok) throw new Error("Failed to update thread");
    return res.json();
});

// Async thunk to delete a thread
export const deleteThread = createAsyncThunk<string, string>(
    "thread/deleteThread",
    async (id) => {
        const res = await fetch(`/api/thread/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete thread");
        return id;
    }
);

export const threadSlice = createSlice({
    name: "thread",
    initialState,
    reducers: {
        selectThread: (state, action: PayloadAction<string | null>) => {
            state.selectedThread =
                state.threads.find((t) => t.id === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch threads
            .addCase(fetchThreads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchThreads.fulfilled, (state, action) => {
                state.threads = action.payload;
                state.loading = false;
            })
            .addCase(fetchThreads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch threads";
            })

            // Create thread
            .addCase(createThread.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.threads.push(action.payload);
                state.selectedThread = action.payload;
                state.loading = false;
            })
            .addCase(createThread.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create thread";
            })
            .addCase(updateThread.fulfilled, (state, action) => {
                const index = state.threads.findIndex(
                    (t) => t.id === action.payload.id
                );
                if (index !== -1) state.threads[index] = action.payload;
                state.selectedThread = action.payload;
            })
            .addCase(deleteThread.fulfilled, (state, action) => {
                state.threads = state.threads.filter(
                    (t) => t.id !== action.payload
                );
                if (state.selectedThread?.id === action.payload)
                    state.selectedThread = null;
            });
    },
});

export const { selectThread } = threadSlice.actions;
export default threadSlice.reducer;
