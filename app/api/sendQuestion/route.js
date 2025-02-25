import { Question } from "@/lib/models/question";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";

export async function POST(params) {
    try {
        const { question } = await params.json();
        const sanitizeQuestion = DOMPurify.sanitize(question);
        if (!sanitizeQuestion || sanitizeQuestion?.trim()?.length == 0) throw new Error("question is empty");
        await connectDb()
        const newQ = new Question({
            question: sanitizeQuestion
        })
        await newQ.save()
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}