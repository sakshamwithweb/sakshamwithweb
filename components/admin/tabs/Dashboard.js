"use client"
import { Edit } from 'lucide-react'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [edit, setEdit] = useState({ mode: false, editTo: "" })
  const [data, setData] = useState(null)
  const [sections] = useState(["about", "knowledge", "project"])

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

  useEffect(() => {
    if (edit.mode) {
      console.log(edit)
    }
  }, [edit])

  if (data) {
    return (
      <div className='min-h-screen flex flex-col'>
        {sections.map((section, index) => {
          if (edit?.mode && edit?.editTo == section) {
            return <p key={index}>Edit this one</p>
          } else {
            let compName = section.charAt(0).toUpperCase() + section.slice(1).toLowerCase()
            const SectionComponent = dynamic(() => import(`@/components/${compName}.js`), { ssr: false });

            return (
              <section key={index} className='flex-1 relative flex flex-col items-center justify-center border-b'>
                <button className='absolute top-1 right-1' onClick={() => { setEdit({ mode: true, editTo: section }) }}><Edit /></button>
                <SectionComponent {...{ [section]: data[section] }} />
              </section>
            )
          }
        })}
      </div>
    )
  } else {
    return <p className='text-center'>Loading..</p>
  }
}

export default Dashboard