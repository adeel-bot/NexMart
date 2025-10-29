    "use client"
import React from 'react';
import Image from 'next/image';


const Footer = () => {
  return (
    <div className='bg-[#E2F4FF] '>
            <div className='flex justify-between  items-center max-w-[88vw] mx-auto border border-transparent
            rounded-2xl bg-white p-12'>
              <div className='font-bold text-2xl text-[#1B5A7D]'>Subscribe Newletter</div>
              <div className='bg-[#EDA415] flex gap-4 text-white rounded-2xl px-6 py-3 focus:border-none'>
                <input className='p-1' type="email" name="email"  id="email" placeholder='Email Address'/>
                <Image className='cursor-pointer' src="/send.svg" height={22} width={22}  alt="send-icon" />
                </div>
              <div className='flex gap-3 items-center'>
                <div >
                <Image className='cursor-pointer' src="/headset.svg" height={34} width={34}  alt="headset-icon" />
                </div>
                <div>Call us at +92 000 0000000</div>
              </div>
            </div>
            <div></div>
    </div>
  )
}

export default Footer