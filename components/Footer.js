"use client"
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"


const Footer = () => {
    const [question, setQuestion] = useState("")
    const { toast } = useToast()
    const sendQuestion = async () => {
        const req1 = await fetch("/api/sendQuestion", {
            method: "POST",
            headers: {
                "Content-Type": "applicaion/json"
            },
            body: JSON.stringify({ question: question })
        })
        const res1 = await req1.json()
        if (res1.success) {
            toast({
                title: "✅ Sent Successfully",
                description: "Your message will be read by us.",
            })
            return
        } else {
            toast({
                title: "❌ Something Went Wrong",
                description: `Contact us: ${process.env.NEXT_PUBLIC_EMAIl}`,
            })
            console.log(res1.error)
            return
        }
    }

    const handleSubmit = async () => {
        if (question.trim() == 0) {
            toast({
                title: "✍️ Write Something",
                description: `Your input is empty..`,
            })
            return
        }
        await sendQuestion()
        setQuestion("")
    }
    return (
        <footer className=''>
            <div className='flex w-full h-48'>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-2xl'>Connect with me:</h1>
                    <div className='flex flex-col gap-1'>
                        <a target='_blank' href='https://github.com/sakshamwithweb'>
                            <img src='/github.png' className='h-14' />
                        </a>
                        <a href='https://www.linkedin.com/in/gourav-krishn-goswami' target='_blank'>
                            <img src='/linkedin.png' className='h-14' />
                        </a>
                    </div>
                </div>
                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <h1 className='text-xl mb-5'>Ask or give feedback</h1>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" value={question} onChange={(e) => { setQuestion(e.target.value) }} placeholder="Enter here" />
                        <Button onClick={handleSubmit}>Send</Button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>Copyright &copy;{new Date().getFullYear()} All rights reserved | Made by Saksham Goswami.</div>
        </footer>
    )
}

export default Footer