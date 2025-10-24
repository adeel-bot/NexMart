import Product_cards from "./components/cards/Product_cards";
import Navbar from "./components/layout/Navbar";
import SubNavbar from "./components/layout/SubNavbar";
import Topbar from "./components/layout/Topbar";
import MainSlider from "./components/sections/MainSlider";
import SubSlider from "./components/sections/SubSlider";

export default function Home() {
  return (
    <div >
        <Topbar/>
        <Navbar/>
        <SubNavbar/>
        <div className="hero flex flex-col">
          <MainSlider/>
          <SubSlider/>
        </div>
        <div className="product-grid flex flex-col gap-12 py-5 px-12 max-w-screen overflow-hidden">
          <div className="flex justify-between ">
            <div>
              <h2 className="text-2xl font-bold text-[#1B5A7D]">Popular Products</h2>
            </div>
            <div className="flex gap-4">
              <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl ">Cameras</button>
              <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl " >Laptops</button>
              <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl " >Tablets</button>
              <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl " >Mouse</button>
            </div>
          </div>
          <Product_cards/>
        </div>
    </div>
  );
}
