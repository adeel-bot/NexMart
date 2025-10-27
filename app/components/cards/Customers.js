    'use client'
import React,{useState} from 'react';
import Image from 'next/image';
const Customers = () => {
    const [customer, setCustomers] = useState([
  {
    name: "Jacob Nai",
    image: "/cs-1.png",
    review: "Absolutely love this product! The quality is excellent and delivery was super fast. Highly recommended.",
  },
  {
    name: "Jasmine Mistari",
    image: "/cs-2.png",
    review: "Good value for money. The packaging was neat and the product matched the description perfectly.",
  },
  {
    name: "Joe Hamam",
    image: "/cs-3.png",
    review: "I’ve been using it for a week now and it works flawlessly. Will definitely buy again!",
  },
  {
    name: "Rehan Saeed",
    image: "/cs-1.png",
    review: "The product quality exceeded my expectations. Customer support was also very responsive.",
  },
  {
    name: "Maya Khalid",
    image: "/cs-2.png",
    review: "Looks exactly like the pictures. Feels durable and well-made. Totally worth the price.",
  },
  {
    name: "Danish Rafi",
    image: "/cs-3.png",
    review: "Satisfied with the purchase. The color and design are great. Would recommend to friends.",
  },
]);
  return (
    <div className='flex gap-4 flex-wrap mx-auto w-[85vw]'>
        {
            customer.map((items,index)=>(
                    <div className='p-5 border w-[25vw] rounded-2xl border-gray-400'>
                        <div className='flex gap-7 items-center'>
                            <div className="relative border border-transparent overflow-hidden rounded-full w-18 h-18 shrink-0">
                                <Image src={items.image} alt={items.name} fill  className="object-contain"/>
                            </div>
                            <div><h2 className='text-lg font-semibold text-[#003F62] '>{items.name}</h2></div>
                        </div>
                        <div>
                            <p>{items.review}</p>
                        </div>
                    </div>
            ))
        }
    </div>
  )
}

export default Customers