import Image from "next/image"
const Navbar = () => {
  return (
    <div className="navbar bg-[#003f62] flex justify-between items-center py-5 px-7">
        <div className="nav-left">
            <div className="nav-logo text-xl font-bold text-white">NexMart</div>
            <div className="nav-search"></div>
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