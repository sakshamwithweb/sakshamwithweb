import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


const Footer = () => {

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
                        <Input type="text" placeholder="Enter here" />
                        <Button>Send</Button>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>Copyright &copy;{new Date().getFullYear()} All rights reserved | Made by Saksham Goswami.</div>
        </footer>
    )
}

export default Footer