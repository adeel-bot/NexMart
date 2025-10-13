"use client";
import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
  return (
    <div className="flex justify-between px-7 py-5 text-sm">
      <div>
        <p>Need help? Call us: (+92) 000 0000000</p>
      </div>
      <div className="flex justify-center items-center gap-11">
        <div className="flex justify-center items-center gap-2">
          <button className="flex justify-center items-center cursor-pointer">
            <Image src="/map-pin.svg" height={24} width={24} alt="location" />
            <p>Our Store</p>
          </button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link href="/track-order" className="flex justify-center items-center gap-2">
            <Image src="/truck.svg" height={24} width={24} alt="truck" />
            <p>Track Your Order</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
