import Image from "next/image"
const Navbar = () => {
  return (
    <div className="navbar bg-[#003f62] flex justify-between items-center py-5 px-13">
        <div className="nav-left flex justify-between gap-25 items-center">
            <div className="nav-logo text-xl font-bold text-white">NexMart</div>
            <div className="nav-search flex items-center bg-white border rounded-l-2xl rounded-r-xl">
                <div className="w-[25vw]">
                <input className="bg-white h-12 w-full text-black border placeholder:text-sm placeholder:text-black outline-0 p-4 border-white rounded-l-xl" type="search" name="search" id="" placeholder="Search Any Thing" spellCheck="false" />
                </div>
                <div>
                    <button className="bg-[#eda415] font-medium  text-white py-3 px-5 border border-transparent rounded-xl cursor-pointer active:bg-[#dc970d]">Search</button>
                </div>
            </div>
        </div>
        <div className="nav-right text-white flex gap-x-6">
            <div className="nav-sigin flex justify-center  gap-2  items-center">
                <Image src="/user.svg" height={22} width={22} alt="user" />
                <p className="font-light">Sign In</p>
            </div>
            <div className="nav-fav flex justify-center  gap-2 items-center">
                <Image src="/heart-plus.svg" height={22} width={22} alt="heart" />
                <p className="font-light">Favourite</p>
            </div>
            <div className="nav-cart flex justify-center gap-2 items-center">
                <Image src="/shopping-bag.svg" height={20} width={20} alt="cart" />
                <p className="font-light">Cart</p>
            </div>
        </div>
    </div>
  )
}

export default Navbar