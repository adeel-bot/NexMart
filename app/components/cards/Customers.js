"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Customers = () => {
  const [customers] = useState([
    {
      name: "Jacob Nai",
      image: "/cs-1.png",
      review:
        "Absolutely love this product! The quality is excellent and delivery was super fast. Highly recommended.",
    },
    {
      name: "Jasmine Mistari",
      image: "/cs-2.png",
      review:
        "Good value for money. The packaging was neat and the product matched the description perfectly.",
    },
    {
      name: "Joe Mechanic",
      image: "/cs-3.png",
      review:
        "I’ve been using it for a week now and it works flawlessly. Will definitely buy again!",
    },
    {
      name: "Rehan Saeed",
      image: "/cs-1.png",
      review:
        "The product quality exceeded my expectations. Customer support was also very responsive.",
    },
    {
      name: "Maya Khalid",
      image: "/cs-2.png",
      review:
        "Looks exactly like the pictures. Feels durable and well-made. Totally worth the price.",
    },
    {
      name: "Danish Rafi",
      image: "/cs-3.png",
      review:
        "Satisfied with the purchase. The color and design are great. Would recommend to friends.",
    },
  ]);

  return (
    <div className="w-[85vw] mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="rounded-2xl"
        style={{
          "--swiper-pagination-color": "rgb(237,164,21)",
          "--swiper-pagination-bottom": "1px",
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {customers.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="h-[200px] w-full flex flex-col justify-between p-6 border border-gray-300 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex gap-5 items-center mb-3">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-[#003F62]">
                    {item.name}
                  </h2>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-5">
                  {item.review}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Customers;
