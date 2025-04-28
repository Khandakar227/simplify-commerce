import Link from "next/link";
import Image from "next/image";

export default function Category() {
    return (

        <Link href="/" className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6 bg-gray-100 pb-3 rounded-md">
            <div className="relative bg-slate-100 w-full h-96">
                <Image src="/products/black.jpg" alt="product" fill sizes="20vw" className="object-cover rounded-md " />
            </div>
            <h1 className="mt-4 px-4 pb-2 font-light text-md font-semibold tracking-wider">
                Category
            </h1>
        </Link>

    );
}