import Link from "next/link";
import Image from "next/image";
const SubNavbar = () => {
  return (
    <div className="subNav bg-[#f4f4f4] flex justify-between py-5 px-13">
        <div className="subNav-left flex gap-17 ">
            <div className="browse-cate bg-[#f3b63d] text-white ">
                <button className="flex gap-1 cursor-pointer h-13">Browse Categories
                <Image src="/chevron-down-white.svg" width={24} height={24} alt="down-button" />
                </button>
            </div>
            <div className="navigations text-[#3a3a3a] flex gap-6">
                <div className="">
                <button className="flex gap-1 cursor-pointer">Home
                <Image src="/chevron-down-black.svg" width={24} height={24} alt="down-button" />
                </button>
                </div>
                <div className="">
                <button className="flex gap-1 cursor-pointer">Catalog
                <Image src="/chevron-down-black.svg" width={24} height={24} alt="down-button" />
                </button>
                </div>
               
                <Link href="/blog-page">Blog</Link>
               <div className="">
                <button className="flex gap-1 cursor-pointer">Pages
                <Image src="/chevron-down-black.svg" width={24} height={24} alt="down-button" />
                </button>
                </div>
                <button>About Us</button>
            </div>
        </div>
        <div className="subNav-right font-bold text-[#003f62]">
            <p>30 Days Free Return</p>
        </div>
    </div>
  )
}

export default SubNavbar