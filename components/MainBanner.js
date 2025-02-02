"use client"
import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js';

const MainBanner = ({about}) => {
    const el = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "Full Stack Developer",
                "Creative Designer",
                "Team Player",
                "Quick Learner",
                "Data Enthusiast",
                "Strategic Planner",
                "Critical Thinker",
                "Coding Enthusiast",
                "Visionary Leader",
                "Problem Solver"
            ],
            typeSpeed: 70,
        });

        return () => {
            typed.destroy();
        };
    }, []);
    return (
        <div className='min-h-screen justify-center border-b text text-center gap-11 flex flex-col' id='main'>
            <div className=''>
                <span className='text-4xl'>I'm&nbsp;</span><span className='text-4xl font-bold text-purple-600'>{about.Name}&nbsp;</span>
            </div>
            <div>
                <span className='text-4xl'>{about.Age} year old&nbsp;</span>
                <span className='text-4xl font-semibold' ref={el} />
            </div>
        </div>
    )
}

export default MainBanner