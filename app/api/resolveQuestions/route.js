import { Question } from "@/lib/models/question"
import connectDb from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { changedQueries } = await req.json()
        await connectDb()
        for (const i of changedQueries) {
            await Question.findOneAndUpdate({ _id: i }, { resolves: true }) 
        }
        return NextResponse.json({ success: true })
    } catch (err) {
        return NextResponse.json({ success: false })
    }
}