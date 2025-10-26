
"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React from 'react'

const Subgrid = () => {

   const Products = [
    {
      name: "Speakers",
      image: "/speakers.jpg",
      price: "25000",
      buy_link: "#",
      detail_link: "#",
    },
    {
      name: "Camera",
      image: "/camera.jpg",
      price: "25000",
      buy_link: "#",
      detail_link: "#",
    },
    {
      name: "HeadPhone",
      image: "/headphone.png",
      price: "10000",
      buy_link: "#",
      detail_link: "#",
    },
    {
      name: "Laptop",
      image: "/laptop.jpg",
      price: "150000",
      buy_link: "#",
      detail_link: "#",
    },
    {
      name: "Gaming Console",
      image: "/game-console.png",
      price: "8000",
      buy_link: "#",
      detail_link: "#",
    },
  ];


  return (
    <div className='flex flex-row'>
        <div className=''>
          <div className="w-[35vw] mx-auto ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
         style={{
    "--swiper-navigation-color": "rgb(237, 164, 21)", 
    "--swiper-pagination-color": "rgb(237, 164, 21)", 
  }}
      >
        {Products.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-6">
              <div className="relative w-full h-[150px] md:w-1/2 flex justify-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
              
              <div className="text-center md:text-left md:w-1/2">
                <h2 className="text-4xl text-[#003F62] font-bold mb-2">{item.name}</h2>
                <p className="text-lg mb-4 text-gray-600">
                  Price: Rs {item.price}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href={item.buy_link}
                    className="bg-[#eda415] text-white px-4 py-2 rounded-xl hover:bg-[#d69411] transition"
                  >
                    Buy Now
                  </Link>
                  <Link
                    href={item.detail_link}
                    className="border border-[#003F62] text-[#003F62] px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                  >
                    View More
                  </Link>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        </div>

        <div className='flex flex-col'>
        <div className=''>section-2</div>
        <div>section-3</div>
        </div>
    </div>
  )
}

export default Subgrid

