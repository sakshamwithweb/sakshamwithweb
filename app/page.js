"use client"
import About from "@/components/About";
import Knowledge from "@/components/Knowledge";
import MainBanner from "@/components/MainBanner";
import Project from "@/components/Project";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/fetchAdminDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "applicaion/json"
        },
        body: JSON.stringify({})
      })
      const res = await req.json()
      setData(res.data)
      return
    })()
  }, [])
  if (data) {
    return (
      <main className="">
        <div><MainBanner /></div>
        <div><About about={data.about} /></div>
        <div><Knowledge knowledge={data.knowledge} /></div>
        <div><Project project={data.project} /></div>
        <div></div>
      </main>
    );
  } else {
    return <p className="text-center">Loading..</p>
  }
}
