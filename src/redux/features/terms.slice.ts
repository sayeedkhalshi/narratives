// src/redux/features/terms.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { TermFormValues } from "@/schemas/terms.schema";

export type TermMeta = {
    initialIdea?: string | null;
    initialAssumption?: string | null;
    initialQuestion?: string | null;
    theStory?: string | null;
    theCurves?: string | null;
    mistakes?: string | null;
    emotionalJourney?: string | null;
    steps?: string | null;
    realizations?: string | null;
    narratives?: string | null;
    hiddenNarratives?: string | null;
    hiddenFlows?: string | null;
    controlStructures?: string | null;
    acknowledgments?: string | null;
    unacknowledgements?: string | null;
    implicationFlowByAcknowledgments?: string | null;
    philosophicalTraps?: string | null;
    hormonalTraps?: string | null;
    cognitiveTraps?: string | null;
    perspectiveTraps?: string | null;
    deliveryOfPerspective?: string | null;
    recommendedFlows?: string | null;
    recommendedFlowsType?: "GOOD" | "BAD" | "WEIRD" | null;
    layer?: string | null;
};

export type Term = {
    id: string;
    type:
        | "GENUINE"
        | "PERSPECTIVE"
        | "ACCEPTED"
        | "PERSONAL"
        | "UNDERSTANDING"
        | "RESEARCH";
    name: string;
    userId?: string | null;
    createdAt: string;
    updatedAt: string;
    meta?: TermMeta | null;
};

export type TermState = {
    terms: Term[];
    selectedTerm: Term | null;
    loading: boolean;
    error: string | null;
};

const initialState: TermState = {
    terms: [],
    selectedTerm: null,
    loading: false,
    error: null,
};

export const fetchTerms = createAsyncThunk<Term[]>(
    "terms/fetchTerms",
    async () => {
        const res = await fetch("/api/terms");
        if (!res.ok) throw new Error("Failed to fetch terms");
        return res.json();
    }
);

export const createTerm = createAsyncThunk<Term, TermFormValues>(
    "terms/createTerm",
    async (data) => {
        const res = await fetch("/api/terms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to create term");
        return res.json();
    }
);

export const updateTerm = createAsyncThunk<
    Term,
    { id: string } & TermFormValues
>("terms/updateTerm", async ({ id, ...data }) => {
    const res = await fetch(`/api/terms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update term");
    return res.json();
});

export const deleteTerm = createAsyncThunk<string, string>(
    "terms/deleteTerm",
    async (id) => {
        const res = await fetch(`/api/terms/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete term");
        return id;
    }
);

export const termsSlice = createSlice({
    name: "terms",
    initialState,
    reducers: {
        selectTerm: (state, action: PayloadAction<string | null>) => {
            state.selectedTerm =
                state.terms.find((t) => t.id === action.payload) || null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTerms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTerms.fulfilled, (state, action) => {
                state.terms = action.payload;
                state.loading = false;
            })
            .addCase(fetchTerms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch terms";
            })
            .addCase(createTerm.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTerm.fulfilled, (state, action) => {
                state.terms.push(action.payload);
                state.selectedTerm = action.payload;
                state.loading = false;
            })
            .addCase(createTerm.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create term";
            })
            .addCase(updateTerm.fulfilled, (state, action) => {
                const idx = state.terms.findIndex(
                    (t) => t.id === action.payload.id
                );
                if (idx !== -1) state.terms[idx] = action.payload;
                state.selectedTerm = action.payload;
            })
            .addCase(deleteTerm.fulfilled, (state, action) => {
                state.terms = state.terms.filter(
                    (t) => t.id !== action.payload
                );
                if (state.selectedTerm?.id === action.payload)
                    state.selectedTerm = null;
            });
    },
});

export const { selectTerm } = termsSlice.actions;
export default termsSlice.reducer;
