    'use client';
import React from 'react'
import { useState, useEffect} from "react";
import Image from "next/image";
import Radio from "../ui/Radio";
import Link from "next/link";
import { getAllProducts } from '@/lib/data/getProducts';

const All_Products = () => {
        const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await getAllProducts();
            setProductData(products);
        } ;
        fetchProducts();  
    }, []);

    
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
            <div className="md:w-full w-xl mx-auto items-center text-center  grid p-4 md:pr-4 md:pb-4 md:pt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {productData.map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-5 border-[1.5px] border-gray-300 rounded-2xl hover:scale-[1.01] duration-200 transition-all ease-in-out"
                >
                  <div className="flex items-center justify-center">
                    <Image
                      width={110}
                      height={110}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg px-2 font-bold text-[#1B5A7D]">
                      {product.title}
                    </h2>
                    <p className="font-semibold px-2 ">$ {product.price}</p>
                    <div className='mx-auto'>
                      <Radio rating={product.rating} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </div>
  )
}

export default All_Products
