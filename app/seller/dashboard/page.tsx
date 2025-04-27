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
          <span className="text-2xl font-bold tracking-wide text-green-700">Simply Commerce</span>
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
      <footer className="w-full bg-white text-green-500 py-6 border-t border-green-200 mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Simply Commerce. All rights reserved.
      </footer>
    </div>
  )
}