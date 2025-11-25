import { getProductbySlug } from "@/lib/data/getProducts";
export const dynamic = "force-dynamic";
import Image from "next/image";
import React from "react";
import Topbar from "@/app/components/layout/Topbar";
import Navbar from "@/app/components/layout/Navbar";
import SubNavbar from "@/app/components/layout/SubNavbar";
import Radio from "@/app/components/ui/Radio";

export default async function Productpage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const product = await getProductbySlug(slug);
  if (!product) {
    return (
      <div className="text-center mt-20 text-red-500 text-xl">
        Product not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      <Navbar />
      <SubNavbar />

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div className="relative border border-gray-300 rounded-2xl overflow-hidden mb-4 h-[450px] w-full">
            <Image
              src={product.image}
              alt={product.title}
              fill 
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            <div className="relative border w-32 h-32 border-gray-300 rounded-xl overflow-hidden flex-1">
              <Image
                src={product.image}
                fill
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="relative border w-32 h-32 border-gray-300 rounded-xl overflow-hidden flex-1">
              <Image
                src={product.image}
                fill
                alt={product.title}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          {/* Rating Component */}
          <div className="flex items-center gap-2">
            <Radio rating={product.rating} />
            <span className="text-gray-600 text-sm">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-2xl font-semibold text-gray-900">
            Price: ${product.price}
          </p>

          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-gray-600">Stock: {product.stock}</p>

          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-xl transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
