"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

const page = () => {
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [wait, setWait] = useState(false)
    const { toast } = useToast()
    const router = useRouter()

    useEffect(() => {
        console.log("Hey! You are a developer, I want to colab with you! In footer write your name, email id and your profession(game,web or whatever)")
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setWait(true)
            if (userName.length == 0 || pass.length == 0) {
                toast({
                    title: "🙀 All table is madetory",
                    description: "Please fill all the fields.",
                })
                setWait(false)
                return
            }
            const req1 = await fetch(`/api/adminLogin`, {
                method: "POST",
                headers: {
                    "Content-Type": "applicaion/json"
                },
                body: JSON.stringify({ userName, pass })
            })
            const res1 = await req1.json()
            if (res1.success) {
                toast({
                    title: "✅ You are logged in here.",
                    description: "In rest you are out.",
                })
                router.push("/admin/dashboard")
            } else {
                toast({
                    title: "❌ Something Went Wrong",
                    description: res1.error,
                })
            }
            setWait(false)
            setUserName("")
            setPass("")
        } catch (error) {
            toast({
                title: "❌ Something Went Wrong",
                description: "Server error",
            })
        }
    }

    return (
        <div className='min-h-screen border-b flex justify-center items-center'>
            <form className='flex flex-col border rounded-xl p-10 items-center'>
                <div>
                    <h1 className='text-2xl m-3 font-bold'>Admin Login</h1>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} name="username" id="username" placeholder="Enter Username" />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" value={pass} onChange={(e) => { setPass(e.target.value) }} name="password" id="password" placeholder="Enter Password" />
                    </div>
                    <Button disabled={wait} onClick={handleSubmit} aria-label="Submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default page