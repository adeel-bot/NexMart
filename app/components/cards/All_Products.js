    'use client';
import React from 'react'
import { useState } from "react";
import Image from "next/image";
import Radio from "../ui/Radio";
const All_Products = () => {
     const [products] = useState([
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
        { image: "/camera.png", name: "Camera", price: "120000", rating: "4.5" },
      ]);
    
  return (
    <div>
            <div className="grid p-7 md:grid-cols-3 sm:grid-cols-2 gap-5">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-5 border-[1.5px] border-gray-300 rounded-2xl hover:scale-[1.01] duration-200 transition-all ease-in-out"
                >
                  <div className="flex items-center justify-center">
                    <Image
                      width={110}
                      height={110}
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg px-2 font-bold text-[#1B5A7D]">
                      {product.name}
                    </h2>
                    <p className="font-semibold px-2 ">$ {product.price}</p>
                    <div>
                      <Radio rating="rating" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default All_Products
