"use client"

import { useState } from "react";
import Slider from "../components/Slider";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";


export default function Home() {


  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100">
    <Navbar/>



      <Slider/>
      <div className="mt-16  px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 pt-6 pb-10 border-t-8 border-green-400 border-opacity-50">
        <h1 className="mb-10 text-2xl font-semibold text-center text-black">Featured Products</h1>
        <ProductList/>
      </div>

      {/* <div className="mt-16">
        <h1 className="mb-10 text-2xl font-semibold text-center text-black">Categories</h1>
        <CategoryList/>
      </div> */}
    </div>
  );
}
