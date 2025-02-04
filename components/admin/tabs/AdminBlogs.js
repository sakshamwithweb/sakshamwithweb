import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useToast } from '@/hooks/use-toast'
import { EllipsisVertical, Link2Icon, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [blogsData, setBlogsData] = useState(null)
  const { toast } = useToast()

  useEffect(() => {
    (async () => {
      const req = await fetch(`/api/fetchBlog`, {
        method: "POST",
        headers: {
          "Content-Type": "applicaion/json"
        },
        body: JSON.stringify({})
      })
      const res = await req.json()
      if (res.success) {
        setBlogsData(res.data)
      } else {
        toast({
          title: "❌ Something Went Wrong",
          description: "Server Error!!",
        })
      }
    })()
  }, [])

  const handledeletePost = async (id) => {
    const req = await fetch(`/api/deletePost`, {
      method: "POST",
      headers: {
        "Content-Type": "applicaion/json"
      },
      body: JSON.stringify({id:id})
    })
    const res = await req.json()
    if (res.success) {
      toast({ description: `✅ Post Deleted` });
      window.location.reload()
    } else {
      toast({ description: `❌ Something went wrong` });
    }
  }

  if (!blogsData) {
    return <p className='m-2 text-center'>Loading...</p>
  } else if (blogsData.length == 0) {
    return (
      <div className='flex justify-center items-center gap-5'>
        <p className='m-2 text-center'>No Post is there</p>
        <Link href={"/admin/blogs/new"}><Button><Plus /></Button></Link>
      </div>
    )
  }

  {/*when click at title so redirect to a page where show the blog*/ }

  return (
    <div className='relative min-h-screen'>
      <Link className='absolute top-0 right-1' href={"/admin/blogs/new"}><Button><Plus /></Button></Link>
      <h1 className='text-xl text-center font-bold'>Your Blogs</h1>
      <div className='flex flex-col gap-6 py-10 w-full items-center'>
        {blogsData.map((item, index) => {
          return (
            <div className='border h-16 relative w-11/12 rounded-2xl flex justify-between items-center' key={index}>
              <div className='overflow-auto h-full mx-2 scrollbar-thin border-r w-[95%] flex text-lg items-center'>
                <h2 className='mx-2 whitespace-nowrap'>{item.title}</h2>
              </div>
              <div className='absolute top-4 right-2'>
                <DropdownMenu>
                  <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => { navigator.clipboard.writeText(`hey my name is saksham || paste link here`); toast({ description: `✅ Copied` }); }}>Save Link<Link2Icon /></DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { handledeletePost(item.id)}}>Delete Post<Trash /></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Blogs