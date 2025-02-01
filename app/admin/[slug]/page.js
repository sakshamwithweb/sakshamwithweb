"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { notFound, usePathname, useRouter } from 'next/navigation'

const page = () => {
    const { toast } = useToast()
    const router = useRouter()
    const slug = usePathname().split("/")[usePathname().split("/").length - 1]
    const [logged, setLogged] = useState(false)
    const [validTabs] = useState(['dashboard', 'blogs', 'queries'])

    if (!validTabs.includes(slug)) return notFound()

    // checking session
    useEffect(() => {
        const checkSession = async () => {
            const req = await fetch("/api/checkSession", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            const res = await req.json()
            if (!res.success) {
                toast({
                    title: "❌ Something Went Wrong",
                    description: "You are logged out",
                })
                router.push("/")
            } else {
                setLogged(true)
            }
        }
        checkSession()
    }, [])

    if (logged) {
        const compName = slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()// slug name capitalized
        const Component = dynamic(() => import(`@/components/admin/tabs/${compName}.js`), {
            ssr: false,
        });
        return (
            < Component />
        )
    } else {
        return (
            <>Loading....</>
        )
    }
}

export default page