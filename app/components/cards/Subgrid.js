"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import Radio from "../ui/Radio";
import { useState, useEffect } from "react";
import Link from "next/link";

const Subgrid = () => {
  const [products, setProducts] = useState([]);
  const [rightSideProducts, setRightSideProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        // Limit to 5 entries for the main slider
        const limitedProducts = data.slice(0, 3);
        setProducts(limitedProducts);
        
        // Get 2 products for the right side (skip first 5, take next 2)
        const rightSideData = data.slice(5, 7);
        setRightSideProducts(rightSideData);
      } catch (err) {
        console.error(err);
        // Fallback data for right side if API fails
        setRightSideProducts([
          {
            id: 101,
            name: "Premium Jacket",
            price: 45.99,
            imageUrl: "/jacket.png",
            rating: 4.5
          },
          {
            id: 102,
            name: "Casual T-Shirt",
            price: 19.99,
            imageUrl: "/tshirt.png",
            rating: 4.2
          }
        ]);
      }
    };
    
    fetchProducts();
  }, []); // Remove [products] to avoid infinite loop

  return (
    <div className="flex flex-row justify-center items-start gap-8 py-6 w-full">
      {/* LEFT SIDE - MAIN SLIDER (Limited to 5 entries) */}
      <div className="w-[50vw] bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={40}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="rounded-2xl"
          style={{
            "--swiper-pagination-color": "rgb(237,164,21)",
          }}
        >
          {products.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={`/Product/${item.id}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10">
                  {/* Image */}
                  <div className="relative w-[200px] h-[200px] md:w-60 md:h-60 shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center items-start text-left">
                    <h2 className="text-xl font-bold text-[#1B5A7D] mb-1">
                      {item.name}
                    </h2>
                    <p className="font-semibold text-gray-700 mb-2">
                      ${item.price}
                    </p>
                    <div className="mb-4">
                      <Radio rating="rating" />
                    </div>

                    {/* Stats Row */}
                    <div className="flex flex-row gap-4 mb-5">
                      {[57, 11, 33, 59].map((num, i) => (
                        <div
                          key={i}
                          className="w-14 h-14 bg-blue-100 flex items-center justify-center rounded-full font-bold text-[#1B5A7D]"
                        >
                          {num}
                        </div>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row items-center gap-3">
                      <button className="flex items-center gap-2 bg-blue-300 hover:bg-blue-400 text-[#1B5A7D] font-semibold px-6 py-2 rounded-2xl shadow-sm transition">
                        Add to cart
                        <span className="text-lg">🛒</span>
                      </button>
                      <button className="flex items-center justify-center bg-blue-200 hover:bg-blue-300 w-12 h-12 rounded-2xl shadow-sm transition">
                        👁
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT SIDE - 2 CARDS WITH REAL DATA */}
      <div className="flex flex-col gap-6">
        {rightSideProducts.map((product, index) => (
          <Link href={`/Product/${product.id}`} key={product.id || index}>
            <div
              className="flex items-center gap-5 p-5 border border-gray-300 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform bg-white w-[30vw]"
            >
              <div className="relative w-[110px] h-[110px] shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-[#1B5A7D]">
                  {product.name}
                </h2>
                <p className="font-semibold text-gray-700">
                  ${product.price}
                </p>
                <div className="mt-1">
                  <Radio rating={product.rating || "rating"} />
                </div>
                <button className="mt-2 bg-[#EDA415] hover:bg-[#ffb432] text-white font-semibold px-4 py-2 rounded-2xl text-sm transition">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Subgrid;