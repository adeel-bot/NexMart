"use client";
import React, { useState } from "react";
import Image from "next/image";
import Radio from "../../components/ui/Radio";

export default function ProductDetails({ product }) {
      const [products, setProducts] = useState()
  return (
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          {/* Main Image */}
      <div className="relative border border-gray-300 rounded-2xl overflow-hidden mb-4 h-[450px] w-full">
  <Image
    src={product.imageUrl}
    alt={product.name}
    fill   // this makes image fill parent div
    className="object-contain"
  />
</div>




          {/* Thumbnails */}
          <div className="flex gap-4">
            <div className="border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className=" border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating Component */}
          <div className="flex items-center gap-2">
            <Radio rating={4.5} />
            <span className="text-gray-600 text-sm">{product.rating}</span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-2xl font-semibold text-gray-900">Price: ${product.price}</p>

          <p className="text-gray-600">Category: {product.category?.name || 'uncategorized'}</p>
          <p className="text-gray-600">Stock: {product.stock}</p>

          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-xl transition">
            Add to Cart
          </button>
        </div>
      </div>
  );
}
