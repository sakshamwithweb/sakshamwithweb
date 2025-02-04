import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Blogs = () => {
  return (
    <div>
      <Link href={"/admin/blogs/new"}><Button><Plus/></Button></Link>
    </div>
  )
}

export default Blogs