"use client"
import Image from "next/image";

import {Bell, ShoppingCart, UserRoundPen} from 'lucide-react'
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartModel from "./CartModel";

export default function NavIcons() {

    const [profileOpen, setProfileOpen] = useState(false)
    const [cartOpen, setCartOpen] = useState(false)
    const [notificationOpen, setNotificationOpen] = useState(false)

    const router = useRouter()

    const isLoggedIn = false

    const handleProfile =()=>{
        if(!isLoggedIn){
            router.push("/login")
        }
        setProfileOpen((prev) => !prev)
    }

    const handleCart =()=>{
        if(!isLoggedIn){
            router.push("/login")
        }
        setCartOpen((prev) => !prev)
    }


    return (
        <div className="flex items-center justify-between gap-4 relative">
            <div className="relative cursor-pointer">
                <ShoppingCart onClick={handleCart}/>
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-red-400 rounded-full flex items-center justify-center text-sm text-white">2</div>
            </div>
            {
                cartOpen && (
                    <div className="absolute p-4 rounded-md top-12 right-0 text-sm shadow-md z-20">
                        <CartModel/>
                    </div>
                )
            }
            <Bell/>
            <UserRoundPen onClick={handleProfile}/>
            {
                profileOpen && (
                    <div className="absolute p-4 rounded-md top-12 right-0 text-sm shadow-md z-20">
                        <Link href="/">Profile</Link>
                        <div className="mt-2 cursor-pointer">Logout</div>
                    </div>
                )
            }
            

        </div>
    );
}