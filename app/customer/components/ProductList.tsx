import Image from "next/image";
import Link from "next/link";
import FeaturedProduct from "./FeaturedProduct";

export default function ProductList() {
    return (
        <div className="grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />
            <FeaturedProduct />

        </div>
    );
}