'use client'

import { IProduct } from "@/lib/model/Product";
import { Card, CardContent, CardHeader } from "../ui/card";

export interface IProductCard {
  id: any,
  name: string,
  price: string,
  stock: number,
  picture: string;
}
function ProductCard({product}:{product: IProductCard}) {
  return (
    <div>
    <Card className="max-w-80 w-full" >
      <CardHeader>
        <img src={product.picture} alt={product.name} className="rounded-md md:h-60 h-48 object-fill w-full"/>
      </CardHeader>
      <CardContent>
          <div>
            <h1 className="font-bold text-xl">{product.name}</h1>
            <p className="text-gray-300">Stock: <b>{product.stock}</b></p>
            <p className="text-gray-300">Price: <b>৳{product.price}</b></p>
          </div>
      </CardContent>
    </Card>

    </div>
  )
}

export default ProductCard;