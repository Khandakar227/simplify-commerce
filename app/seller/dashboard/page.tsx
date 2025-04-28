'use client'
import Product, { IProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/lib/client-api";
import { IProduct } from "@/lib/model/Product";
import { Search, UserCircle, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [products, setProducts] = useState([] as IProductCard[]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setLoading(true);
    getProducts({ keyword, page: currentPage.toString(), seller:true }).then((data) => {
      setProducts(data.data || []);
      setTotalPages(data.totalPages);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false);
    });
  }, [currentPage, keyword]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword((e.target as HTMLFormElement).keyword.value);
    setCurrentPage(0);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      {/* Navbar */}
      <nav className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-green-200 shadow-sm flex items-center justify-between px-8 py-3">
        <div className="flex items-center">
          {/* SVG Logo */}
          <svg className="w-8 h-8 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="white"/>
            <path d="M16 10l-4 4-2-2" strokeWidth="2" stroke="currentColor" fill="none"/>
          </svg>
          <Link href={"/seller/dashboard"} className="text-2xl font-bold tracking-wide text-green-700">Simply Commerce</Link>
        </div>
        <div className="flex-1 flex justify-center">
          <Tabs defaultValue="dashboard">
            <TabsList className="bg-transparent gap-2 flex">
              <TabsTrigger value="dashboard" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-2 transition bg-green-50">Dashboard</TabsTrigger>
              <TabsTrigger value="orders" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-2 transition bg-green-50">Orders</TabsTrigger>
              <TabsTrigger value="products" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-2 transition bg-green-50">Products</TabsTrigger>
              <TabsTrigger value="settings" className="text-green-700 data-[state=active]:bg-amber-50 data-[state=active]:font-bold rounded-lg px-4 py-2 transition bg-green-50">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <button className="rounded-full p-2 hover:bg-green-100 transition border border-green-200 flex items-center justify-center">
          <UserCircle size={32} className="text-green-600" />
        </button>
      </nav>

      {/* Centered Dashboard Heading */}
      <div className="w-full flex justify-center items-center mt-6 mb-2">
        <h1 className="font-extrabold text-4xl text-green-700 text-center">Products Inventory</h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-4 px-2">
        <div className="w-screen px-4">
          <Card className="bg-amber-50 shadow-xl rounded-none border border-amber-200 p-6">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
                  <form onSubmit={search} className="flex-1 flex items-center bg-green-50 rounded-lg px-2 py-1 border border-green-200 shadow-inner min-w-[250px] max-w-xl">
                    <Search size={18} className="text-green-400 mr-2" />
                    <Input type="search" placeholder="Search Products..." name="keyword" className="bg-transparent border-none focus:ring-0 text-green-800 placeholder:text-green-400 flex-1" />
                  </form>
                  <Link href="/seller/add" className="">
                    <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow px-5 py-2 flex items-center gap-2">
                      <Plus size={18} /> Add New Product
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 flex-wrap justify-center items-center">
                {
                  !loading ? products.map((product) => (
                    <div className="bg-white border border-amber-200 rounded-xl shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg w-72" key={product.id}>
                      <Product product={product} />
                    </div>
                  )) : <p>Loading...</p>
                }
              </div>
            </CardContent>
            <CardFooter>
              {
                totalPages === 0 ? <p className="text-green-500">No products found</p>
                  :
                  <div className="flex justify-between items-center gap-4 mx-auto mt-4">
                    <Button variant="outline" className="rounded-lg" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                    <p className="text-green-700">Page {currentPage + 1} of {totalPages}</p>
                    <Button variant="outline" className="rounded-lg" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                  </div>
              }
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-green-600 text-white py-6 mt-8 shadow-inner">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="6" width="18" height="13" rx="2" strokeWidth="2" stroke="currentColor" fill="white" />
              <path d="M16 10l-4 4-2-2" strokeWidth="2" stroke="currentColor" fill="none" />
            </svg>
            <span className="font-bold text-lg">Simplify Commerce</span>
          </div>
          <div className="text-sm text-white/80 flex flex-col md:flex-row items-center gap-2">
            <span>Contact: <a href="mailto:contact@simplify.com" className="underline hover:text-white">contact@simplify.com</a></span>
          </div>
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <a href="#" className="hover:text-white" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/></svg>
            </a>
            <a href="#" className="hover:text-white" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z"/></svg>
            </a>
            <a href="#" className="hover:text-white" aria-label="LinkedIn">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm15.25 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9v5.6h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/></svg>
            </a>
            <a href="#" className="hover:text-white" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.28.058-2.16.24-2.91.51-.8.29-1.48.68-2.16 1.36-.68.68-1.07 1.36-1.36 2.16-.27.75-.452 1.63-.51 2.91C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.24 2.16.51 2.91.29.8.68 1.48 1.36 2.16.68.68 1.36 1.07 2.16 1.36.75.27 1.63.452 2.91.51C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.16-.24 2.91-.51.8-.29 1.48-.68 2.16-1.36.68-.68 1.07-1.36 1.36-2.16.27-.75.452-1.63.51-2.91.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.24-2.16-.51-2.91-.29-.8-.68-1.48-1.36-2.16-.68-.68-1.36-1.07-2.16-1.36-.75-.27-1.63-.452-2.91-.51C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}