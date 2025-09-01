import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/terms → list all (include meta)
export async function GET() {
    try {
        const terms = await prisma.term.findMany({
            orderBy: { createdAt: "desc" },
            include: { meta: true },
        });
        return NextResponse.json(terms);
    } catch (error) {
        console.error("GET /api/terms error:", error);
        return NextResponse.json(
            { error: "Failed to fetch terms" },
            { status: 500 }
        );
    }
}

// POST /api/terms → create core + meta
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {
            name,
            type,
            userId,
            // everything past this is meta
            initialIdea,
            initialAssumption,
            initialQuestion,
            theStory,
            theCurves,
            mistakes,
            emotionalJourney,
            steps,
            realizations,
            narratives,
            hiddenNarratives,
            hiddenFlows,
            controlStructures,
            acknowledgments,
            unacknowledgements,
            implicationFlowByAcknowledgments,
            philosophicalTraps,
            hormonalTraps,
            cognitiveTraps,
            perspectiveTraps,
            deliveryOfPerspective,
            recommendedFlows,
            recommendedFlowsType,
            layer,
        } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: "name and type are required" },
                { status: 400 }
            );
        }

        // Build meta payload (omit entirely if all undefined)
        const metaData = {
            initialIdea,
            initialAssumption,
            initialQuestion,
            theStory,
            theCurves,
            mistakes,
            emotionalJourney,
            steps,
            realizations,
            narratives,
            hiddenNarratives,
            hiddenFlows,
            controlStructures,
            acknowledgments,
            unacknowledgements,
            implicationFlowByAcknowledgments,
            philosophicalTraps,
            hormonalTraps,
            cognitiveTraps,
            perspectiveTraps,
            deliveryOfPerspective,
            recommendedFlows,
            recommendedFlowsType,
            layer,
        };

        const hasAnyMeta = Object.values(metaData).some(
            (v) => v !== undefined && v !== null && v !== ""
        );

        const term = await prisma.term.create({
            data: {
                name,
                type,
                userId: userId ?? null,
                ...(hasAnyMeta && {
                    meta: {
                        create: metaData,
                    },
                }),
            },
            include: { meta: true },
        });

        return NextResponse.json(term, { status: 201 });
    } catch (error) {
        console.error("POST /api/terms error:", error);
        return NextResponse.json(
            { error: "Failed to create term" },
            { status: 500 }
        );
    }
}
