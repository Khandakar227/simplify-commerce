"use client"


import { useState } from 'react';
import Image from 'next/image';
import Navbar from "@/components/navbar/Navbar";

const ProductPage = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-gray-200 h-lvh">
      <Navbar/>
      
      <div className="mt-10 flex flex-col md:flex-row gap-8 container mx-auto px-4 py-8 bg-green-50">
        {/* Product Images - Left Side */}
        <div className="md:w-1/2">
          {/* Main Image */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <Image 
              src={selectedImage} 
              alt={product.name}
              width={50}
              height={550}
              className=" object-contain"
              priority
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 ${selectedImage === image ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details - Right Side */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Price */}
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="ml-2 bg-red-100 text-red-800 text-sm font-medium px-2 py-0.5 rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'fill-current' : 'stroke-current fill-none'}`}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 ml-2">
              {product.reviewCount} reviews
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Variants (if any) */}
          {product.variants && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Options</h2>
              <div className="flex gap-2">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-lg font-semibold mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 border rounded-l-md text-black bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b py-1 text-gray-600 y- font-bold"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-black px-3 py-1 border rounded-r-md bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex-1 transition-colors">
              Add to Cart
            </button>
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-md flex-1 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 border-t pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Availability</h3>
                <p className="text-green-600">In Stock ({product.stock} items)</p>
              </div>
              <div>
                <h3 className="font-semibold">SKU</h3>
                <p>{product.sku}</p>
              </div>
              <div>
                <h3 className="font-semibold">Brand</h3>
                <p>{product.brand}</p>
              </div>
              <div>
                <h3 className="font-semibold">Shipping</h3>
                <p>Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;