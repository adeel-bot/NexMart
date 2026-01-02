"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Radio from "../../components/ui/Radio";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../components/cards/ProductCard"; // Adjust path if needed

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

  // Function to add all items in a combo to the cart
  const addComboToCart = (combo) => {
    combo.items.forEach((item) => {
      // Assuming each item has quantity (default to 1) and product object
      addToCart(item.product.id, item.quantity || 1);
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          <div className="relative border border-gray-300 rounded-2xl overflow-hidden mb-4 h-[450px] w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="flex gap-4">
            <div className="border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div className="border border-gray-300 h-[150px] rounded-xl overflow-hidden flex-1">
              <Image
                src={product.imageUrl}
                height={150}
                width={150}
                alt={product.name}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

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
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Combos Section - Updated */}
      {combos.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Buy with These Combos & Save!
          </h2>

          <div className="space-y-8">
            {combos.map((combo) => (
              <div
                key={combo.id}
                className="border border-gray-200 rounded-2xl shadow-lg p-8 bg-white hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  {/* Combo Info */}
                  <div className="flex-1">
                    <Link href={`/combos/${combo.id}`}>
                      <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer">
                        {combo.name}
                      </h3>
                    </Link>
                    {combo.description && (
                      <p className="text-gray-600 mt-2">{combo.description}</p>
                    )}
                    <p className="text-3xl font-bold text-green-600 mt-4">
                      Combo Price: ${combo.price}
                    </p>
                    {combo.originalPrice && (
                      <p className="text-lg text-gray-500 line-through">
                        Original: ${combo.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Add Combo Button */}
                  <button
                    onClick={() => addComboToCart(combo)}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition shadow-md"
                  >
                    Add Combo to Cart
                  </button>
                </div>

                {/* Preview of Combo Items in Grid */}
                <div className="mt-8">
                  <p className="text-lg font-semibold text-gray-700 mb-4">
                    Includes:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {combo.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <ProductCard product={item.product} />
                        {item.quantity > 1 && (
                          <span className="mt-2 text-sm text-gray-500">
                            Qty: {item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}