"use client"

import Image from "next/image";

export default function CartModel() {

    const cartItems: number = 4;

    return (
        <div className="flex flex-col items-center gap-6">
            {
                cartItems === 0 ? (
                    <div className="">Cart is Empty</div>
                ) : (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-6">
                            {Array.from({ length: cartItems }).map((_, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="relative w-20 h-20">
                                        <Image src="/products/realsense.jpg" alt="product" fill className="rounded-xl" />
                                    </div>
                                    <div className="flex flex-col justify-around">
                                        <div className="flex justify-between">
                                            <div className="flex flex-col">
                                                <h2 className="font-bold text-lg">Realsense</h2>
                                                <h2 className="text-xs text-green-600 opacity-60">Available</h2>
                                            </div>
                                            <h2 className="text-lg">$45</h2>
                                        </div>
                                        <div className="flex justify-between gap-16">
                                            <h2 className="text-xs">Quantity:2</h2>
                                            <h2 className="text-xs text-red-600 opacity-60 cursor-pointer">Remove</h2>
                                        </div>
                                    </div>

                                </div>
                            ))}

                        </div>
                        <div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-bold">Subtotal</h2>
                                    <h2 className="text-lg font-bold">$90</h2>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button className=" text-gray-600 border border-black px-4 py-2 rounded-md">View Cart</button>
                                    <button className=" text-gray-600 bg-black text-yellow-50 px-4 py-2 rounded-md">Checkout</button>
                                </div>
                            </div>
                        </div>


                    </div>


                )
            }
        </div>
    );
}