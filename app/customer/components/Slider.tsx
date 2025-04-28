"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
    {
        id: 1,
        title: "Winter Sale Collection",
        description: "Sale! Up to 50% off!!",
        img: "/products/black.jpg",
        bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
        url: "/",
    },
    {
        id: 2,
        title: "Winter Sale Collection",
        description: "Sale! Up to 50% off!!",
        img: "/products/green.jpg",
        bg: "bg-gradient-to-r from-pink-50 to-blue-50",
        url: "/",
    },
    {
        id: 3,
        title: "Winter Sale Collection",
        description: "Sale! Up to 50% off!!",
        img: "/products/pink.jpg",
        bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
        url: "/",
    },

]

export default function Slider() {


    const [current, setCurrent] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCurrent(prev => (prev + 1) % slides.length);
        },4000)

        return ()=> clearInterval(interval);
    },[]);

    return (
        <div className="h-[calc(100vh-80px)] overflow-hidden">
            <div className="w-max h-full flex transition-all ease-in-out duration-1000"
                style={{transform:`translateX(-${current*100}vw)`}}
            >
                {
                    slides.map(slide => (

                        <div className={`${slide.bg} w-screen h-full flex flex-col gap-16 md:flex-row`} key={slide.id}>
                            <div className="h-1/2 md:w-1/2 md:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
                                <h2 className="text-black text-xl md:text-2xl lg:text-3xl 2xl:text-5xl font-semibold">{slide.description}</h2>
                                <h1 className="text-black text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl font-semibold">{slide.title}</h1>
                                <Link href={slide.url}>
                                    <button className="rounded-md bg-black text-white py-3 px-4">SHOP NOW</button>
                                </Link>
                            </div>
                            <div className="h-1/2 md:w-1/2 md:h-full relative">
                                <Image src={slide.img} alt="image" fill className="object-cover" />
                            </div>
                        </div>



                    ))
                }
            </div>
            <div className="absolute flex m-auto left-1/2 bottom-8 gap-4">
                {
                    slides.map((slide, index) => (
                        <div key={slide.id} className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""}`} onClick={()=>setCurrent(index)}>

                            {
                                current === index && (
                                    <div className="w-[6px] h-[6px] bg-gray-600 rounded-full" >

                                    </div>
                                )
                            }
                        </div>

                    ))
                }
            </div>
        </div>
    );
}