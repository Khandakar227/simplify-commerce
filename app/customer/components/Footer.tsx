import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
    return (
        <div className="bg-gray-100 p-4 mt-12 flex flex-col justify-center align-middle gap-4">
            <h1 className="text-center text-lg font-bold">Follow Us!</h1>
            <div className="flex justify-center align-middle gap-4">
                <Facebook />
                <Instagram />
                <Twitter/>

            </div>
        </div>
    );
}