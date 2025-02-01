import React from 'react'
import { Progress } from "@/components/ui/progress"

const Knowledge = () => {
    const skills = [
        { skill: "HTML CSS", percentage: 100 },
        { skill: "Javascript", percentage: 100 },
        { skill: "React.js and Next.js", percentage: 85 },
        { skill: "Python", percentage: 20 },
    ]
    return (
        <div id='knowledge' className='flex flex-col justify-center items-center border-b'>
            <h1 className='text-3xl font-bold underline'>Knowledge</h1>
            <div className='my-24 grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-6'>
                {skills.map((i,index) => {
                    return (
                        <div className='md:w-80 w-64' key={index}>
                            <strong>{i.skill}</strong>
                            <Progress value={i.percentage} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}

export default Knowledge