import Link from "next/link";
import Image from "next/image";

export default function FeaturedProduct() {
    return (

        <Link href="/" className="w-full flex flex-col bg-gray-100 pb-3 rounded-md">
            <div className="relative w-full h-80">
                <Image src="/products/black.jpg" alt="product" fill className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500" />
                <Image src="/products/pink.jpg" alt="product" fill className="absolute object-cover rounded-md" />
            </div>
            <div className="px-3">
            <div className="mt-4 flex justify-between">
                <span className="font-medium text-black">Winter Jacket</span>
                <span className="font-semibold text-black">$49</span>
            </div>
            <div className="">
                <span className="text-sm text-gray-500">Winterware for winter lovers</span>
            </div>
            <button className="mt-4 text-start rounded-2xl ring-1 ring-red-400 text-red-400 py-1 px-4 w-fit hover:bg-red-400 hover:text-white">Add to Cart</button>
            </div>
        </Link>

    );
}