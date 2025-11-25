"use client";

import { useState } from "react";
import Image from "next/image";
const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Play game",
      color: "Green",
      size: 30,
      price: 11.7,
      quantity: 1,
      image: "https://picsum.photos/200/300", // Placeholder for green controller
    },
    {
      id: 2,
      name: "Play game",
      color: "Black",
      size: 30,
      price: 11.7,
      quantity: 1,
      image: "https://picsum.photos/200/300", // Placeholder for black controller
    },
  ]);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) newQty = 1;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal; // Assuming no tax/discount for simplicity

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 font-medium text-gray-700">
                  Product
                </th>
                <th className="text-center py-4 font-medium text-gray-700">
                  Price
                </th>
                <th className="text-center py-4 font-medium text-gray-700">
                  Quantity
                </th>
                <th className="text-right py-4 font-medium text-gray-700">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 py-4">
                  <td className="py-4 align-top">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 overflow-hidden rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Color: {item.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="text-center py-4">
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center border-0 font-medium"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="text-right py-4">
                    <span className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </td>
                  <td className="text-right py-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-4"
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Cart Total */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Cart total</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Apply
              </button>
            </div>
            <div className="flex space-x-2">
              <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md">
                <option>Country</option>
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-gray-900 font-medium">Total amount</span>
              <span className="text-2xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
          Continue shopping
        </button>
        <button className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
          Clear cart
        </button>
        <button className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
          Update cart
        </button>
        <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
