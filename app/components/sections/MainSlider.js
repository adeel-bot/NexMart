"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState,useEffect } from "react";

const MainSlider = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
      const fetchProducts = async ()=>{
        try{
                const prods = await fetch('/api/products');
                const data = await prods.json();
                const prod_list = data.slice(0,5);
                setProducts(prod_list);
        }catch(err){
          console.error(err);
        }
      }
      fetchProducts();
      },[])
  // const Products = [
  //   {
  //     name: "Camera",
  //     image: "/camera.jpg",
  //     price: "25000",
  //     buy_link: "#", 
  //     detail_link: "/Products",
  //   },
  //   {
  //     name: "HeadPhone",
  //     image: "/headphone.png",
  //     price: "10000",
  //     buy_link: "#",
  //     detail_link: "/Products",
  //   },
  //   {
  //     name: "Laptop",
  //     image: "/laptop.jpg",
  //     price: "150000",
  //     buy_link: "#",
  //     detail_link: "/Products",
  //   },
  //   {
  //     name: "Gaming Console",
  //     image: "/game-console.png",
  //     price: "8000",
  //     buy_link: "#",
  //     detail_link: "/Products",
  //   },
  // ];

  return (
    <div className="w-full mx-auto py-10">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-2xl shadow-lg"
         style={{
    "--swiper-navigation-color": "rgb(237, 164, 21)", 
    "--swiper-pagination-color": "rgb(237, 164, 21)", 
  }}
      >
        {products.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between px-20 py-6">
              <div className="text-center md:text-left md:w-1/2">
                <h2 className="text-4xl text-[#003F62] font-bold mb-2">{item.name}</h2>
                <p className="text-lg mb-4 text-gray-600">
                  Price: Rs {item.price}
                </p>
                <div className="flex gap-4 justify-center md:justify-start">
                  <Link
                    href={`/Product/${item.id}`}
                    className="bg-[#eda415] text-white px-4 py-2 rounded-xl hover:bg-[#d69411] transition"
                  >
                    Buy Now
                  </Link>
                  <Link
                    href={`/Product/${item.id}`}
                    className="border border-[#003F62] text-[#003F62] px-4 py-2 rounded-xl hover:bg-blue-50 transition"
                  >
                    View More
                  </Link>
                </div>
              </div>

              <div className="relative w-full h-[350px] md:w-1/2 flex justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;
