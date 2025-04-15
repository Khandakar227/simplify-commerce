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
    <div className="p-4">
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
    </div>
  )
}