import { Admin } from "@/lib/models/admin/admin"
import connectDb from "@/lib/mongoose"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { rateLimit } from "@/lib/rateLimit";


async function CheckHashPass(userPass, hashPass) {
    try {
        const result = await bcrypt.compare(userPass, hashPass);
        return result;
    } catch (err) {
        console.error("Error comparing passwords:", err);
        return false;
    }
}

export async function POST(req) {
    try {
        const isAllowed = await rateLimit(req);
        if (!isAllowed) return NextResponse.json({success:false,error:"Too many requests, try 5 minutes later"});
        const { userName, pass } = await req.json()
        console.log(userName, pass)
        await connectDb()
        const admin = await Admin.findOne({ userName: userName })
        if (!admin) return NextResponse.json({ success: false, error: "Wrong credentials" })
        const checkPass = await CheckHashPass(pass, admin.pass)
        if (checkPass != true) return NextResponse.json({ success: false, error: "Wrong credentials" })
        return NextResponse.json({ success: true, userName: admin.userName })

    } catch (error) {
        return NextResponse.json({ success: false, error: `Server error, contact:${process.env.NEXT_PUBLIC_EMAIl}` })
    }
}