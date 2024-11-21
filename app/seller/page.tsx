'use client'
import Product, { IProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getProducts, getUserInfo } from "@/lib/client-api";
import { IProduct } from "@/lib/model/Product";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SellerProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");


  useEffect(() => {
    getUserInfo().then((data) => {
      setName(data.name || []);
      console.log(data);
      setEmail(data.email);
      setPhone(data.phone);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
    //   setLoading(false);
    });

  }, []);
  
  return(
    <div>
        <h1>{name}</h1>
        <h1>{email}</h1>
        <h1>{phone}</h1>
    </div>
  )
}