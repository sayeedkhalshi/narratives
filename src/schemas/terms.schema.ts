// src/schemas/terms.schema.ts
import { z } from "zod";

export const TermKindEnum = z.enum([
    "GENUINE",
    "PERSPECTIVE",
    "ACCEPTED",
    "PERSONAL",
    "UNDERSTANDING",
    "RESEARCH",
]);

export const RecommendedFlowsTypeEnum = z.enum(["GOOD", "BAD", "WEIRD"]);

export const termSchema = z.object({
    // core fields
    name: z.string().min(3, "Name must be at least 3 characters"),
    type: TermKindEnum,
    userId: z.string().optional(), // ObjectId string (optional)

    // meta fields (all optional strings unless enum)
    initialIdea: z.string().optional(),
    initialAssumption: z.string().optional(),
    initialQuestion: z.string().optional(),
    theStory: z.string().optional(),
    theCurves: z.string().optional(),
    mistakes: z.string().optional(),
    emotionalJourney: z.string().optional(),
    steps: z.string().optional(),
    realizations: z.string().optional(),
    narratives: z.string().optional(),
    hiddenNarratives: z.string().optional(),
    hiddenFlows: z.string().optional(),
    controlStructures: z.string().optional(),
    acknowledgments: z.string().optional(),
    unacknowledgements: z.string().optional(),
    implicationFlowByAcknowledgments: z.string().optional(),
    philosophicalTraps: z.string().optional(),
    hormonalTraps: z.string().optional(),
    cognitiveTraps: z.string().optional(),
    perspectiveTraps: z.string().optional(),
    deliveryOfPerspective: z.string().optional(),
    recommendedFlows: z.string().optional(),
    recommendedFlowsType: RecommendedFlowsTypeEnum.optional(),
    layer: z.string().optional(),
});

export type TermFormValues = z.infer<typeof termSchema>;
