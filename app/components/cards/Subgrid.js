"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from "react";
import Radio from "../ui/Radio";

const Subgrid = () => {
  const Products = [
    {
      name: "JBL bar 2.1 deep bass",
      image: "/speakers.jpg",
      price: "11,70",
    },
    {
      name: "Camera",
      image: "/camera.jpg",
      price: "25,000",
    },
    {
      name: "HeadPhone",
      image: "/headphone.png",
      price: "10,000",
    },
  ];

  return (
    <div className="flex flex-row justify-center items-start gap-8 py-6 w-full">
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
          {Products.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10">
                {/* Image */}
                <div className="relative w-[200px] h-[200px] md:w-60 md:h-60 shrink-0">
                  <Image
                    src={item.image}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RIGHT SIDE SMALL CARDS */}
      <div className="flex flex-col gap-6">
        {[1, 2].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-5 p-5 border border-gray-300 rounded-2xl shadow-sm hover:scale-[1.01] transition-transform bg-white w-[30vw]"
          >
            <Image
              width={110}
              height={110}
              src={i === 0 ? "/game-console.png" : "/laptop.jpg"}
              alt="side-product"
              className="object-contain"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-[#1B5A7D]">Play game</h2>
              <p className="font-semibold text-gray-700">$11,70</p>
              <Radio rating="rating" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subgrid;
