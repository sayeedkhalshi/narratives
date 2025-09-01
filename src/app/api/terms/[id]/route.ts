import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string };
}

// GET /api/terms/:id → include meta
export async function GET(_req: Request, { params }: Params) {
    try {
        const term = await prisma.term.findUnique({
            where: { id: params.id },
            include: { meta: true },
        });

        if (!term)
            return NextResponse.json({ error: "Not found" }, { status: 404 });

        return NextResponse.json(term);
    } catch (error) {
        console.error("GET /api/terms/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to fetch term" },
            { status: 500 }
        );
    }
}

// PUT /api/terms/:id → update core + upsert meta
export async function PUT(req: Request, { params }: Params) {
    try {
        const body = await req.json();
        const {
            name,
            type,
            userId,
            // meta
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

        const term = await prisma.term.update({
            where: { id: params.id },
            data: {
                ...(name !== undefined && { name }),
                ...(type !== undefined && { type }),
                ...(userId !== undefined && { userId }),
                ...(hasAnyMeta && {
                    meta: {
                        upsert: {
                            create: metaData,
                            update: metaData,
                        },
                    },
                }),
            },
            include: { meta: true },
        });

        return NextResponse.json(term);
    } catch (error) {
        console.error("PUT /api/terms/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to update term" },
            { status: 500 }
        );
    }
}

// DELETE /api/terms/:id
export async function DELETE(_req: Request, { params }: Params) {
    try {
        // Prisma will cascade delete TermMeta if you add referential action. If not, delete meta first.
        await prisma.termMeta.deleteMany({ where: { termId: params.id } });
        await prisma.term.delete({ where: { id: params.id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("DELETE /api/terms/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to delete term" },
            { status: 500 }
        );
    }
}
