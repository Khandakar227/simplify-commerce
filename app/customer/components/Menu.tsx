"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Menu() {

    const [open, setOpen] = useState(false)

    return (
        <div>

            <Image src="/menu-icon/menu.png" alt="Logo" width={28} height={28} className="cursor-pointer" onClick={() => setOpen((prev) => !prev)} />
            {
                open && (
                    <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-8 text-xl z-10">
                        <Link href="/">Homepage</Link>
                        <Link href="/">Shop</Link>
                        <Link href="/">Orders</Link>
                        <Link href="/">Cart</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Logout</Link>
                    </div>
                )
            }
        </div>

    );
}