"use client";
import CategoryInput from "@/components/products/category-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Tiptap from "@/components/ui/tiptap";
import { FormEvent, useState } from "react";


export default function AddProduct() {
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    async function onAddProduct(e:FormEvent) {
      try {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const res = await fetch("/api/product/picture", {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        
        if (data.error) {
            alert(data.error);
            return;
        }
        
        const { pictures } = data;
        formData.delete("images");
        const productData = Object.fromEntries(formData.entries()) as any;
        productData.pictures = pictures;
        productData.description = description;

      } catch (error) {
        
      } finally {
        setLoading(false);
      }
    }

    function selectCategory(category: string) {
      setCategory(category);
    }
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-extrabold text-3xl py-4">
            ADD A NEW PRODUCT
          </CardTitle>
        </CardHeader>

        <CardContent>
            <div className="py-5 px-4 max-w-3xl mx-auto">
                <form onSubmit={onAddProduct}>
                    <div className="flex gap-4 items-start justify-center py-4 flex-col">
                        <Label><b>Name</b></Label>
                        <Input name="name" type="text" className="w-full"/>
                    </div>
                    
                    <div className="flex gap-4 items-start justify-center py-4 flex-col">
                        <Label><b>Product Image</b></Label>
                        <Input name="images" type="file" className="w-full cursor-pointer bg-white bg-opacity-15"/>
                    </div>
                    <div>
                      <Label><b>Category</b></Label>
                      <CategoryInput selectedCategory={category} onSelectCategory={selectCategory} />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-4 items-start justify-center py-4 flex-col">
                            <Label><b>Price</b></Label>
                            <Input name="price" type="number" min="0" className="w-full"/>
                        </div>
                        <div className="flex gap-4 items-start justify-center py-4 flex-col">
                            <Label><b>Stock</b></Label>
                            <Input name="stock" type="number" min="0" className="w-full"/>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start justify-center py-4 flex-col">
                        <Label><b>Description</b></Label>
                        <Tiptap onContentChange={setDescription}/>
                    </div>
                    <Button type="submit" variant={"destructive"}>{ loading ? "Adding..." : "Add Product"}</Button>
                </form>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
