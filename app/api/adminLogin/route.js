import { Admin } from "@/lib/models/admin/admin"
import connectDb from "@/lib/mongoose"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const { userName, pass } = await req.json()
        console.log(userName, pass)
        // check if true or else return an err
        await connectDb()
        const admin = await Admin.findOne({ userName: userName })
        if (!admin) throw new Error("Wrong credentials");
        if (admin.pass != pass) throw new Error("Wrong credentials");
        return NextResponse.json({ success: true, userName: admin.userName })
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message })
    }
}