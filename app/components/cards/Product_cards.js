  "use client";
import Image from "next/image";
import { useState } from "react";
import Radio from "../ui/Radio";
const Product_cards = () => {
      const [products, setProducts] = useState([
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
        {
          image:'/camera.png',
          name:'Camera',
          price:'120000',
          rating:'4.5'
        },
      ])
  return (
    <div className=" grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto gap-5 w-[90vw]">
      {
          products.map((products,index)=>
            <div key={index} className="flex flex-col p-5 border-[1.5px] border-gray-300 rounded-2xl hover:scale-[1.01] duration-200 transition-all ease-in-out">
        <div className="flex items-center justify-center">
        <Image width={150} height={150} src={products.image} alt={products.name} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg px-2 font-bold text-[#1B5A7D]">{products.name}</h2>
          <p className="font-semibold px-2 ">$ {products.price}</p>
          <div><Radio rating="rating"/></div>
        </div>
      </div>
          )
      }
     
    </div>
  )
}

export default Product_cards