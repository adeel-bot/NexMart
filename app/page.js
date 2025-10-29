import Product_cards from "./components/cards/Product_cards";
import Navbar from "./components/layout/Navbar";
import SubNavbar from "./components/layout/SubNavbar";
import Topbar from "./components/layout/Topbar";
import MainSlider from "./components/sections/MainSlider";
import SubSlider from "./components/sections/SubSlider";
import Banner from "./components/sections/Banner";
import SubGrid from "./components/cards/Subgrid";
import Customers from "./components/cards/Customers";
import Footer from "./components/layout/Footer";
export default function Home() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <SubNavbar />
      <div className="hero flex flex-col">
        <MainSlider />
        <SubSlider />
      </div>
      <div className="product-grid flex flex-col gap-12 py-5 px-12 max-w-screen overflow-hidden">
        <div className="flex justify-between ">
          <div>
            <h2 className="text-2xl font-bold text-[#1B5A7D]">
              Popular Products
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl ">
              Cameras
            </button>
            <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl ">
              Laptops
            </button>
            <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl ">
              Tablets
            </button>
            <button className="border-[1.5px] text-sm text-[#1B5A7D] font-semibold border-gray-200 transition-all duration-75 ease-linear hover:border-[#003F62] py-2 px-5 rounded-2xl ">
              Mouse
            </button>
          </div>
        </div>
        <Product_cards />
      </div>
      <div className="relative flex justify-center items-center mb-16">
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
      <div className="w-full flex justify-center items-center h-[75vh] p-5">
        <SubGrid />
      </div>
          <div className="bg-[#e2f4ff] border border-transparent rounded-2xl w-[85vw] mx-auto px-12 flex justify-between gap-3 mb-15">
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-[#003F62] font-bold text-xl">
              Free Delivery
              </h2>
              <p className="text-[#003F62]">on order above 3500</p>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-[#003F62] font-bold text-xl">
              Best Quality
              </h2>
              <p className="text-[#003F62]">best quality on low price</p>
            </div>
            <div className="p-6 flex flex-col gap-3">
              <h2 className="text-[#003F62] font-bold text-xl">
               1 Year Warranty
              </h2>
              <p className="text-[#003F62]">Available Warranty</p>
            </div>
          </div>
          <div className="mb-15">
            <Customers/>
          </div>
          <div className="mx-auto w-[85vw]">
              <div className="bg-[#E2F4FF] flex flex-row p-10 justify-between">
                  <div>Logo 1</div>
                  <div>Logo 2</div>
                  <div>Logo 3</div>
                  <div>Logo 4</div>
                  <div>Logo 5</div>
              </div>
          </div>
          <div className="max-w-[100vw]">
            <Footer/>
          </div>
    </div>
  );
}
