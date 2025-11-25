import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Topbar from '../components/layout/Topbar';
import SubNavbar from '../components/layout/SubNavbar'; 
import CartDetails from './CartDetails';
const page = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <SubNavbar /> 
      <CartDetails />
      <Footer />
    </div>
  )
}

export default page
