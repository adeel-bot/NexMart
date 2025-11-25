import Link from "next/link";
import Image from "next/image";
const SubNavbar = () => {
  return (
    <div className="subNav bg-[#f4f4f4] flex md:flex-row flex-col justify-between items-center px-13">
        <div className="subNav-left flex gap-17 ">
            <div className="browse-cat flex items-center p-3 h-13 bg-[#f3b63d] text-white ">
                <Link href="/Products" className="flex items-center text-center gap-1 cursor-pointer">Browse Categories
                <Image src="/chevron-down-white.svg" width={24} height={24} alt="down-button" />
                </Link>
            </div>
            <div className="navigations h-13 text-[#3a3a3a] flex gap-5 items-center">
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
        <div className="subNav-right text-sm font-bold text-[#003f62]">
            <p>30 Days Free Return</p>
        </div>
    </div>
  )
}

export default SubNavbar