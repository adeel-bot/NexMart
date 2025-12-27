"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Radio from "../../components/ui/Radio";
import { useCart } from "../../../context/CartContext";

export default function ProductDetails({ product }) {
  const { addToCart } = useCart();
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    const fetchCombos = async () => {
      try {
        const res = await fetch(`/api/products/${product.id}/combos`);
        if (res.ok) {
          const data = await res.json();
          setCombos(data);
        }
      } catch (error) {
        console.error("Failed to fetch combos", error);
      }
    };

    if (product.id) {
      fetchCombos();
    }
  }, [product.id]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div className="relative border border-gray-300 rounded-2xl overflow-hidden mb-4 h-[450px] w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill // this makes image fill parent div
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4">
            <div className="border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className=" border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Rating Component */}
          <div className="flex items-center gap-2">
            <Radio rating={4.5} />
            <span className="text-gray-600 text-sm">{product.rating}</span>
          </div>

          <p className="text-gray-700">{product.description}</p>

          <p className="text-2xl font-semibold text-gray-900">
            Price: ${product.price}
          </p>

          <p className="text-gray-600">
            Category: {product.category?.name || "uncategorized"}
          </p>
          <p className="text-gray-600">Stock: {product.stock}</p>

          <button
            onClick={() => addToCart(product.id)}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-xl transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Combos Section */}
      {combos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Available in these Combos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((combo) => (
              <div key={combo.id} className="border rounded-lg p-4 shadow">
                <Link href={`/combos/${combo.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
                    {combo.name}
                  </h3>
                </Link>
                {combo.description && (
                  <p className="text-gray-600 mb-2">{combo.description}</p>
                )}
                <p className="font-bold text-lg mb-2">${combo.totalPrice}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
