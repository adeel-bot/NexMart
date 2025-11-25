"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StripSlider = () => {
  const items = [
    {
      name: "DSLR Cameras",
      image: "/camera.jpg",
      relatedCount: 12,
      link: "/Products",
    },
    {
      name: "Laptops",
      image: "/laptop.jpg",
      relatedCount: 8,
      link: "/Products",
    },
    {
      name: "Gaming Console",
      image: "/game-console.png",
      relatedCount: 6,
      link: "/Products",
    },
    {
      name: "Headphones",
      image: "/headphone.png",
      relatedCount: 15,
      link: "/Products",
    },
    {
      name: "Speaker",
      image: "/speaker.jpg",
      relatedCount: 10,
      link: "/Products",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
         style={{
        "--swiper-navigation-color": "rgb(237, 164, 21)", 
        "--swiper-pagination-color": "rgb(237, 164, 21)",
  }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center gap-4 bg-white shadow-md border border-gray-200 rounded-2xl px-12 py-4 hover:shadow-lg transition duration-200 ease-in-out mt-3 mb-3">
              {/* Left side — image */}
              <div className="relative w-24 h-24 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              {/* Right side — text + link */}
              <div className="flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-[#003F62]">
                  {item.name}
                </h3>
                <Link
                  href={item.link}
                  className="text-blue-600 hover:underline text-sm mt-2"
                >
                  {item.relatedCount} more products →
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StripSlider;
