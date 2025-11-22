import React from 'react'
import Topbar from '../components/layout/Topbar';
import Navbar from '../components/layout/Navbar';
import SubNavbar from '../components/layout/SubNavbar';
import MainSlider from '../components/sections/MainSlider';
import StripSlider from '../components/sections/SubSlider';
import All_Products from '../components/cards/All_Products';
const Product = () => {
  return (
    <div>
         <Topbar />
      <Navbar />
      <SubNavbar />
      <div>
        <div>
          <aside>

          </aside>
        </div>
        <div>
          <All_Products/>
        </div>
      </div>
    </div>
  )
}

export default Product