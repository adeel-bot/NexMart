// app/cart/page.tsx
"use client";

import { useCart } from '../../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function CartPage() {
  const { items, subtotal, total, isLoading, updateQuantity, removeItem, clearCart } = useCart();

  const handleQuantityChange = (itemId: number, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EDA415]"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you havent added any items to your cart yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#1B5A7D] text-white px-6 py-3 rounded-lg hover:bg-[#003F62] transition-colors"
            >
              <FiArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                  <button
                    onClick={() => clearCart()}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                  >
                    <FiTrash2 /> Clear All
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      {item.product.imageUrl ? (
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-lg font-medium text-gray-800 hover:text-[#1B5A7D]"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">In Stock</p>
                      <p className="text-[#EDA415] font-bold text-lg mt-2">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#EDA415]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toast.success('Proceeding to checkout!')}
                className="w-full mt-8 bg-[#1B5A7D] text-white py-3 rounded-lg font-medium hover:bg-[#003F62] transition-colors"
              >
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="w-full mt-4 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <FiArrowLeft /> Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Free Delivery</strong> on orders above $35
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  <strong>30-Day Return Policy</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}