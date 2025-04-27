'use client'
import Product, { IProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getProducts } from "@/lib/client-api";
import { IProduct } from "@/lib/model/Product";
import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle } from "lucide-react";

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
      console.log(data);
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
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <nav className="w-full bg-gray-900 shadow flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-bold tracking-wide text-green-400">Simply Commerce</span>
          <Tabs defaultValue="dashboard">
            <TabsList className="bg-transparent gap-2">
              <TabsTrigger value="dashboard" className="text-white">Dashboard</TabsTrigger>
              <TabsTrigger value="orders" className="text-white">Orders</TabsTrigger>
              <TabsTrigger value="products" className="text-white">Products</TabsTrigger>
              <TabsTrigger value="settings" className="text-white">Settings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 hover:bg-gray-800 transition">
            <UserCircle size={32} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-between items-center gap-4">
          <h1 className="font-extrabold text-3xl py-4">DASHBOARD</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Products Inventory</CardTitle>
            <CardDescription>
              <div className="flex justify-between items-center gap-4 md:flex-row">
                <Link href="/seller/add">
                  <Button className="dark:bg-green-300 bg-green-300">Add New Product</Button>
                </Link>
                <form onSubmit={search} className="my-5 flex gap-4 items-center justify-center max-w-[400px] w-full">
                  <Input type="search" placeholder="Search Products" name="keyword" className="bg-white bg-opacity-20"/>
                  <Button><Search/></Button>
                </form>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex gap-4 flex-wrap justify-center items-center">
            {
              !loading ? products.map((product) => (
                <Product key={product.id} product={product}/>
              )) : <p>Loading...</p>
            }
            </div>
          </CardContent>

          <CardFooter>
            {
              totalPages === 0 ? <p>No products found</p>
              :
            <div className="flex justify-between items-center gap-4 mx-auto">
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
              <p>Page {currentPage + 1} of {totalPages}</p>
              <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
            </div>
            }
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8 mt-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-bold text-green-400">Simply Commerce</span>
            <span className="text-sm mt-1">Your one-stop tech shop for all electronics and robotics needs.</span>
          </div>
          <div className="flex gap-8 mt-4 md:mt-0">
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">Links</span>
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/products" className="hover:underline">Products</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-white">Seller</span>
              <Link href="/seller/dashboard" className="hover:underline">Dashboard</Link>
              <Link href="/seller/orders" className="hover:underline">Orders</Link>
              <Link href="/seller/products" className="hover:underline">My Products</Link>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-6">&copy; {new Date().getFullYear()} Simply Commerce. All rights reserved.</div>
      </footer>
    </div>
  )
}