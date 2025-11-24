"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-[#E2F4FF] py-10 px-17 ">
      <div
        className="flex justify-between flex-wrap items-center max-w-[88vw] mx-auto border border-transparent
            rounded-2xl bg-white p-12"
      >
        <div className="font-bold text-2xl text-[#1B5A7D]">
          Subscribe Newletter
        </div>
        <div className="bg-[#EDA415] flex gap-4 text-white rounded-2xl px-6 py-3 focus:border-none">
          <input
            className="px-4 text-sm py-2 rounded-xl placeholder:text-sm focus:ring-0 focus:outline-[1px] focus:outline-white "
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
          <Image
            className="cursor-pointer"
            src="/send.svg"
            height={22}
            width={22}
            alt="send-icon"
          />
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <Image
              src="/headset.svg"
              height={34}
              width={34}
              alt="headset-icon"
            />
          </div>
          <div>Call us at +92 000 0000000</div>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-12">
        <div>
          <div className="nav-logo text-xl font-bold text-[#1B5A7D]">
            NexMart
          </div>
          <div>
            <p className="w-45">64 st james boulevard hoswick , ze2 7zj</p>
          </div>
        </div>
        <div className=" text-[#1B5A7D] flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Find Products</h2>
          <ul className="gap-1 flex flex-col">
            <li>Brownze arnold</li>
            <li>Chronograph blue</li>
            <li>Smart phones</li>
            <li>Automatic watch</li>
            <li>Hair straighteners</li>
          </ul>
        </div>
        <div className=" text-[#1B5A7D] flex flex-col gap-2">
          <h2 className="font-semibold text-lg">Get Help</h2>
          <ul className="gap-1 flex flex-col">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Return policy</li>
            <li>Privacy policy</li>
            <li>Payment policy</li>
          </ul>
        </div>
        <div className=" text-[#1B5A7D] flex flex-col gap-2">
          <h2 className="font-semibold text-lg">About Us</h2>
          <ul className="gap-1 flex flex-col">
            <li>News</li>
            <li>Service</li>
            <li>Out Policy</li>
            <li>Customer Care</li>
            <li>Faqs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
