/**
 * API route to summarize email thread using AI.
 * 
 * Author: John Clark
 * Date: 12/29/2025
 * AI Assistance Disclosure: GitHub Copilot was utilized to assist in code generation and debugging.
 * 
 * Connects thread-list to AI summary module.
 */

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