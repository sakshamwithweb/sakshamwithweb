import { AdminDetails } from "@/lib/models/adminDetails";
import connectDb from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectDb()
        const data = await AdminDetails.findOne({ name: "Saksham" })
        if (!data) throw new Error("Unable to get data");
        return NextResponse.json({ data: data, success: true })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Unable to fetch data" }, { status: 500 })
    }
}