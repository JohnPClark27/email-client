import { NextResponse } from "next/server";
import { summarizeThread } from "@/app/lib/ai-summary";

export async function POST(request: Request) {
    try {
        const { emails } = await request.json();
       
        if (!emails || emails.length === 0) {
            return NextResponse.json({ error: 'No thread content provided.' }, { status: 400 });
        }
        const summary = await summarizeThread(emails);
        return NextResponse.json({ summary });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to summarize thread.' }, { status: 500 });
    }
}