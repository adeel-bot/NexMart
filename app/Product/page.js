import React from 'react'
import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import SubNavbar from '../components/layout/SubNavbar';
import MainSlider from '../components/sections/MainSlider';
import StripSlider from '../components/sections/SubSlider';
import All_Products from '../components/cards/All_Products';
import SidebarFilters from '../components/sections/SidebarFilters';
import Banner from '../components/sections/Banner';
import Footer from '../components/layout/Footer';
const Product = () => {
  return (
    <div>
         <Topbar />
      <Navbar />
      <SubNavbar />
      <div className='flex flex-col md:flex-row mt-20'>
        <div className='p-4 '>  
          <SidebarFilters/>
        </div>
        <div className='w-full'>
          <All_Products/>
        </div>
      </div>
      <div className="relative flex justify-center items-center mt-16 mb-16">
        <Banner />
        <div className="absolute right-35 text-center flex flex-col gap-7">
          <div>
            <button className="bg-[#EDA415] px-5 py-3 cursor-pointer text-white text-sm rounded-2xl">
              New Laptop
            </button>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-4xl text-[#2E8FC5] font-extrabold">
              Sale up to 50% off
            </h1>
            <p className="text-white">14 inch Hd Display</p>
          </div>
          <div>
            <button className="bg-[#EDA415] px-5 py-3 cursor-pointer text-white text-sm rounded-2xl">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[100vw]">
            <Footer/>
          </div>
    </div>
  )
}

export default Product