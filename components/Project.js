import React from 'react'

const Project = () => {
    const projects = [
        { title: "Google-Shield", Made_With: "Next.js", Repositry: "https://github.com/sakshamwithweb/Google-Shield", Description: "Empower women with a protector and informer 24/7." },
        { title: "Deliveryss", Made_With: "Next.js", Repositry: "https://github.com/sakshamwithweb/Deliveryss", Description: "Clone of Delhivery." },
        { title: "Visisphere", Made_With: "Next.js", Repositry: "https://github.com/sakshamwithweb/visisphere", Description: "Learn any deep or hard topic by visualizing in 3d." },
        { title: "Life Organizer", Made_With: "Next.js and OMI", Repositry: "https://github.com/sakshamwithweb/Life-Organizer", Description: "Organizing life as folder with summaries and extract task of each day." },
        { title: "Hey Lawyer", Made_With: "Next.js and OMI", Repositry: "https://github.com/sakshamwithweb/hey-lawyer", Description: "Have a lawyer 24/7." },
        { title: "Aspira", Made_With: "Next.js and OMI", Repositry: "https://github.com/sakshamwithweb/Aspira", Description: "Learn any soft skill from role model." },
        { title: "Saksham With Web", Made_With: "Next.js", Repositry: "https://github.com/sakshamwithweb/sakshamwithweb", Description: "Saksham's Identity." }
    ]



    return (
        <div id='projects' className='flex flex-col items-center justify-center border-b'>
            <h1 className='text-3xl font-bold underline'>Projects</h1>
            <div className='cards my-24 grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5'>
                {projects.map((items, index) => {
                    return (
                        <a href={items.Repositry} target='_blank' className='rounded-xl flex flex-col border md:max-w-40vw max-w-80vw overflow-auto' key={index}>
                            <h1 className='text-2xl font-bold text-center p-5'>{items.title}</h1>
                            <span className='text-center text-xl whitespace-nowrap'>{items.Description} Made using {items.Made_With}</span>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default Project