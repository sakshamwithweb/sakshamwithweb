"use client"
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { notFound, usePathname, useRouter } from 'next/navigation'

const page = () => {
    const { toast } = useToast()
    const router = useRouter()
    const pathName = usePathname() // /admin/dashboard like
    const slug = usePathname().split("/")[usePathname().split("/").length - 1] // dashboard, queries like
    const [logged, setLogged] = useState(false)
    const [validTabs] = useState(['/admin/dashboard', '/admin/blogs', '/admin/queries', '/admin/blogs/new'])

    if (!validTabs.includes(pathName)) return notFound()

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
        // pathName.split("/") = ['', 'admin', 'blogs', 'new']
        // .slice(1).map((url) => url.charAt(0).toUpperCase() + url.slice(1)).join('') = AdminBlogsNew
        
        const compName = pathName.split("/").slice(1).map((url) => url.charAt(0).toUpperCase() + url.slice(1)).join('')
        
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