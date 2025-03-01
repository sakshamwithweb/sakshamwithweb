"use client"
import About from "@/components/About";
import Knowledge from "@/components/Knowledge";
import { Loader } from "@/components/Loader";
import MainBanner from "@/components/MainBanner";
import Project from "@/components/Project";
import { useToast } from "@/hooks/use-toast";
import { generateToken } from "@/lib/generateToken";
import { getStatusMessage } from "@/lib/statusMessage";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const { token, id } = await generateToken()
        const req = await fetch(`/api/fetchAdminDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({id})
        })
        if (!req.ok) {
          const statusText = await getStatusMessage(req.status)
          throw new Error(`Error ${req.status}: ${statusText}`);
        }
        const res = await req.json()
        if (res.success) {
          setData(res.data)
        } else {
          throw new Error("Unable to fetch Admin details!");
        }
      } catch (error) {
        toast({
          title: `❌ ${error.message}`,
          description: `Write your issue in footer!`,
        })
      }
    })()
  }, [])

  if (!data) {
    return <Loader />
  }

  return (
    <main className="">
      <div><MainBanner about={data.about} /></div>
      <div><About about={data.about} /></div>
      <div><Knowledge knowledge={data.knowledge} /></div>
      <div><Project project={data.project} /></div>
      <div></div>
    </main>
  );

}
