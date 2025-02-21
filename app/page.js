"use client"
import About from "@/components/About";
import Knowledge from "@/components/Knowledge";
import { Loader } from "@/components/Loader";
import MainBanner from "@/components/MainBanner";
import Project from "@/components/Project";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      try {
        const req = await fetch(`/api/fetchAdminDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({})
        })
        if (!req.ok) {
          throw new Error(`Error ${req.status}: ${req.statusText}`);
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
    return <Loader/>
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
