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
    </div>
  );
}
