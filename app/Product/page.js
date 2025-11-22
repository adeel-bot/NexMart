import React from 'react'
import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import SubNavbar from '../components/layout/SubNavbar';
import MainSlider from '../components/sections/MainSlider';
import StripSlider from '../components/sections/SubSlider';
import All_Products from '../components/cards/All_Products';
import SidebarFilters from '../components/sections/SidebarFilters';
const Product = () => {
  return (
    <div>
         <Topbar />
      <Navbar />
      <SubNavbar />
      <div className='flex mt-20'>
        <div className='w-[30vw] p-7'>
          <aside>
          <SidebarFilters/>
          </aside>
        </div>
        <div className='w-screen'>
          <All_Products/>
        </div>
      </div>
    </div>
  )
}

export default Product