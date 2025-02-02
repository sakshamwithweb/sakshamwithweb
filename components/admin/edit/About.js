import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const About = () => {
    const details = {
        Name: "Saksham Goswami",
        Age: "14",
        Study: "9th",
        Interest:"Coding"
    }
    return (
        <div id='about' className='flex flex-col justify-center items-center border-b'>
            <h1 className='text-3xl font-bold underline'>About</h1>
            <div className='my-9'>
                <Avatar>
                    <AvatarImage src="/image.jpg" alt="avatar" />
                    <AvatarFallback>Saksham</AvatarFallback>
                </Avatar>
            </div>
            <div className='mb-9'>
                <ul>
                    {Object.entries(details).map(([key, value], index) => (
                        <li key={index} className='text-xl'>
                            <strong>{key}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default About