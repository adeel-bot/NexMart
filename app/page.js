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
        <div className="product-grid">
          <div className="flex justify-between py-5 px-12">
            <div><h2>Popular Products</h2></div>
            <div >
              <button>Cameras</button>
              <button>Laptops</button>
              <button>Tablets</button>
              <button>Mouse</button>
            </div>
          </div>
          <Product_cards/>
        </div>
    </div>
  );
}
