"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  picture: string;
  slug: string;
};

type ProductResponse = {
  totalPages: number;
  totalCount: number;
  currentPage: number;
  data: Product[];
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductResponse>({
    totalPages: 1,
    totalCount: 0,
    currentPage: 1,
    data: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get current search params
  const page = searchParams.get('page') || '1';
  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';
  const sortby = searchParams.get('sortby') || '';
  const order = searchParams.get('order') || '';
  const [categories, setCategories] = useState<{id: number, name: string }[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    };

    fetchCategories();
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const params = new URLSearchParams({
          page,
          ...(keyword && { keyword }),
          ...(category && { category }),
          ...(sortby && { sortby }),
          ...(order && { order }),
        });

        const res = await fetch(`/api/product?${params}`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [page, keyword, category, sortby, order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newKeyword = formData.get('keyword') as string;
    
    // Update URL with new search params
    const params = new URLSearchParams();
    if (newKeyword) params.set('keyword', newKeyword);
    if (category) params.set('category', category);
    if (sortby) params.set('sortby', sortby);
    if (order) params.set('order', order);
    params.set('page', '0'); // Reset to first page on new search
    
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    params.set('page', '0'); // Reset to first page when filters change
    if (name == 'category' && value == "all") params.set('category', "");
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pb-8">
      <Navbar/>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        
        <div className="w-full md:w-auto">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-full md:w-64"
                name="keyword"
                defaultValue={keyword}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Categories</h2>
            <Select 
              name="category" 
              value={category} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All Categories</SelectItem>
                {
                  categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Sort By</h2>
            <Select 
              name="sortby" 
              value={sortby} 
              onValueChange={(value) => handleFilterChange('sortby', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="created_at">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Order</h2>
            <Select 
              name="order" 
              value={order} 
              onValueChange={(value) => handleFilterChange('order', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ascending" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          {products.data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.data.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="aspect-square relative bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                          src={product.picture}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                      <p className="text-primary font-bold mt-2">Tk. {product.price}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button className="bg-green-200" variant="outline" asChild>
                        <Link href={`/product/${product.slug}`}>Details</Link>
                      </Button>
                      <Button>Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {products.totalPages > 1 && (
                <div className="mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href={`?page=${Number(page) > 1 ? Number(page) - 1 : 1}`}
                          isActive={Number(page) !== 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: products.totalPages }, (_, i) => i).map(
                        (pageNum) => (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href={`?page=${pageNum}`}
                              isActive={pageNum === Number(page)}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href={`?page=${Number(page) < products.totalPages ? Number(page) + 1 : products.totalPages}`}
                          isActive={Number(page) !== products.totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}