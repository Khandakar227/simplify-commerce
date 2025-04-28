"use client";

import {Search} from 'lucide-react'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import React from 'react';


export default function SearchBar() {

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        if(name){
            router.push(`/list?name=${name}`)
        }
    }

    return (
        <form className="flex justify-between items-center gap-4 bg-gray-100 p-2 rounded-md flex-1"
            onSubmit={handleSearch}
        >
            
            <input type="text" name="name" placeholder="Search" className='flex-1 bg-transparent outline-none'/>
            <button type='submit' className="cursor-pointer">
                <Search size={20} color='black' opacity={0.6}/>
            </button>
            

        </form>
    );
}