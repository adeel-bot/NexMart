"use client";

import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Radio from "../ui/Radio";

const Product_cards = () => {
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

  // Split products into groups of 4 per slide
  const slides = [];
  for (let i = 0; i < products.length; i += 8) {
    slides.push(products.slice(i, i + 8));
  }

  return (
    <div className="w-[90vw] mx-auto">
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1} // Show 1 grid per slide
        className="product-swiper"
         style={{
        "--swiper-pagination-color": "rgb(237, 164, 21)",
        "--swiper-pagination-bottom": "-5px",
  }}
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index}>
            <div className="grid p-7 md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {group.map((product, idx) => (
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product_cards;
