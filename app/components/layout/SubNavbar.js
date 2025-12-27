"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const SubNavbar = () => {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const pagesRef = useRef(null);
  const catalogRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setPagesOpen(false);
      }
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setCatalogOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="subNav bg-[#f4f4f4] flex md:flex-row flex-col justify-between items-center px-13">
      <div className="subNav-left flex gap-17">
        <div className="browse-cat flex items-center p-3 h-13 bg-[#f3b63d] text-white">
          <Link href="/Products" className="flex items-center gap-1">
            Browse Categories
            <Image src="/chevron-down-white.svg" width={24} height={24} alt="down" />
          </Link>
        </div>

        <div className="navigations h-13 text-[#3a3a3a] flex gap-5 items-center">
          {/* Catalog Dropdown */}
          <div className="relative" ref={catalogRef}>
            <button
              onClick={() => setCatalogOpen(!catalogOpen)}
              className="flex gap-1 items-center"
            >
              Catalog
              <Image src="/chevron-down-black.svg" width={24} height={24} alt="down" />
            </button>

            {catalogOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-md border z-50">
                <Link
                  href="/Products"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setCatalogOpen(false)}
                >
                  All Products
                </Link>
                <Link
                  href="/Products"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setCatalogOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  href="/Products"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setCatalogOpen(false)}
                >
                  Best Sellers
                </Link>
                <Link
                  href="/Products"
                  className="block px-4 py-2 hover:bg-gray-100 text-red-600"
                  onClick={() => setCatalogOpen(false)}
                >
                  On Sale
                </Link>
              </div>
            )}
          </div>

          {/* Pages Dropdown */}
          <div className="relative" ref={pagesRef}>
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              className="flex gap-1 items-center"
            >
              Pages
              <Image src="/chevron-down-black.svg" width={24} height={24} alt="down" />
            </button>

            {pagesOpen && (
              <div className="absolute top-full mt-2 w-44 bg-white shadow-lg rounded-md border z-50">
                <Link href="/about" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setPagesOpen(false)}>
                  About Us
                </Link>
                <Link href="/contact" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setPagesOpen(false)}>
                  Contact
                </Link>
                <Link href="/faq" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setPagesOpen(false)}>
                  FAQ
                </Link>
                <Link href="/terms" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setPagesOpen(false)}>
                  Terms & Conditions
                </Link>
              </div>
            )}
          </div>

          <Link href="/about">About Us</Link>
        </div>
      </div>

      <div className="subNav-right text-sm font-bold text-[#003f62]">
        <p>30 Days Free Return</p>
      </div>
    </div>
  );
};

export default SubNavbar;
