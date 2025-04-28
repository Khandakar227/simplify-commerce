"use client"

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


import Image from "next/image";
import Link from "next/link";
import Category from "./Category";

export default function CategoryList() {

    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 300; // Adjust scroll amount
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount),
                behavior: "smooth", // Enables smooth animation
            });
        }
    };

    return (
        <div className="relative flex items-center">
            
            <button 
                className="absolute left-6 z-10 p-2 bg-white rounded-full shadow-md hidden md:flex"
                onClick={() => scroll("left")}
            >
                <ChevronLeft size={24} />
            </button>

            <div ref={scrollRef} className="flex-1 px-4 overflow-x-scroll scrollbar-hide">
                <div className="flex gap-4 md:gap-8">
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                    <Category />
                </div>
            </div>
            <button 
                className="absolute right-6 z-10 p-2 bg-white rounded-full shadow-md hidden md:flex"
                onClick={() => scroll("right")}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
}