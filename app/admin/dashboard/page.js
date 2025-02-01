"use client"
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'

const page = () => {
  const { toast } = useToast()
  const router = useRouter()
  const [logged, setLogged] = useState(false)
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

  useEffect(() => {
    if (logged) {
      // fetch details then store and show
    }
  }, [logged])

  if (!logged) {
    return (
      <>bad</>
    )
  }

  return (
    <>good</>
  )
}

export default page