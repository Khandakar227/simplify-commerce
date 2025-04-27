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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm flex items-center justify-between px-8 py-3">
        <span className="text-2xl font-bold tracking-wide text-blue-700">Simply Commerce</span>
        <div className="flex-1 flex justify-center">
          <Tabs defaultValue="dashboard">
            <TabsList className="bg-transparent gap-2 flex">
              <TabsTrigger value="dashboard" className="text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2 transition hover:bg-blue-100">Dashboard</TabsTrigger>
              <TabsTrigger value="orders" className="text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2 transition hover:bg-blue-100">Orders</TabsTrigger>
              <TabsTrigger value="products" className="text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2 transition hover:bg-blue-100">Products</TabsTrigger>
              <TabsTrigger value="settings" className="text-gray-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg px-4 py-2 transition hover:bg-blue-100">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <button className="rounded-full p-2 hover:bg-blue-100 transition border border-blue-200 flex items-center justify-center">
          <UserCircle size={32} className="text-blue-600" />
        </button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-8 px-2">
        <div className="w-screen px-4">
          <h1 className="font-extrabold text-4xl py-4 text-blue-700 mb-2">DASHBOARD</h1>
          <Card className="bg-white shadow-xl rounded-none border border-gray-200 p-6">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-2xl text-blue-700">Products Inventory</CardTitle>
                <div className="flex gap-2 w-full md:w-auto">
                  <Link href="/seller/add" className="w-full md:w-auto">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow px-5 py-2 flex items-center gap-2 w-full md:w-auto">
                      <Plus size={18} /> Add New Product
                    </Button>
                  </Link>
                  <form onSubmit={search} className="flex-1 flex items-center bg-gray-100 rounded-lg px-2 py-1 border border-gray-200 shadow-inner max-w-xs ml-auto">
                    <Search size={18} className="text-gray-400 mr-2" />
                    <Input type="search" placeholder="Search Products..." name="keyword" className="bg-transparent border-none focus:ring-0 text-gray-800 placeholder:text-gray-400 flex-1" />
                  </form>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6 flex-wrap justify-center items-center">
                {
                  !loading ? products.map((product) => (
                    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg w-72" key={product.id}>
                      <Product product={product} />
                    </div>
                  )) : <p>Loading...</p>
                }
              </div>
            </CardContent>
            <CardFooter>
              {
                totalPages === 0 ? <p className="text-gray-500">No products found</p>
                  :
                  <div className="flex justify-between items-center gap-4 mx-auto mt-4">
                    <Button variant="outline" className="rounded-lg" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                    <p className="text-gray-700">Page {currentPage + 1} of {totalPages}</p>
                    <Button variant="outline" className="rounded-lg" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                  </div>
              }
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white text-gray-500 py-6 border-t border-gray-200 mt-8 text-center text-sm">
        &copy; {new Date().getFullYear()} Simply Commerce. All rights reserved.
      </footer>
    </div>
  )
}