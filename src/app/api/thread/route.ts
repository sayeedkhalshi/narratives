import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST: Create a new thread
export async function POST(request: Request) {
    try {
        const { name, description } = await request.json();

        if (!name) {
            return NextResponse.json(
                { error: "Thread name is required" },
                { status: 400 }
            );
        }

        const thread = await prisma.thread.create({
            data: {
                name,
                description: description || null,
                // Optional: link user if you have auth
                // user: { connect: { id: userId } }
            },
        });

        return NextResponse.json(thread, { status: 201 });
    } catch (error) {
        console.error("Error creating thread:", error);
        return NextResponse.json(
            { error: "Failed to create thread" },
            { status: 500 }
        );
    }
}

// GET: Fetch all threads
export async function GET() {
    try {
        const threads = await prisma.thread.findMany({
            orderBy: { createdAt: "desc" },
            include: { projects: true }, // include related projects if needed
        });
        return NextResponse.json(threads);
    } catch (error) {
        console.error("Error fetching threads:", error);
        return NextResponse.json(
            { error: "Failed to fetch threads" },
            { status: 500 }
        );
    }
}
