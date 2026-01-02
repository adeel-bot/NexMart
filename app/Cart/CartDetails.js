"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const CartDetails = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      const res = await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity: newQty }),
      });
      if (!res.ok) throw new Error("Failed to update quantity");
      await fetchCart(); // Refetch cart to get updated totals and state
    } catch (err) {
      setError(err.message);
    }
  };
  
  const removeItem = async (itemId) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });
      if (!res.ok) throw new Error("Failed to remove item");
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveCombo = async (comboId) => {
    const itemsToRemove = cart.items.filter(item => item.comboId === comboId);
    try {
      for (const item of itemsToRemove) {
        await removeItem(item.id);
      }
      await fetchCart();
    } catch (err) {
      setError("Failed to remove combo from cart.");
    }
  };
  
  const clearCart = async () => {
    try {
      const res = await fetch("/api/cart/clear", { method: "POST" });
      if (!res.ok) throw new Error("Failed to clear cart");
      await fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const processCartItems = (items) => {
    if (!items) return { individualItems: [], comboGroups: new Map() };

    const individualItems = items.filter((item) => !item.comboId);
    const comboItems = items.filter((item) => item.comboId);

    const comboGroups = comboItems.reduce((acc, item) => {
      if (!acc.has(item.comboId)) {
        acc.set(item.comboId, {
          comboName: item.combo.name,
          items: [],
          totalPrice: 0,
        });
      }
      const group = acc.get(item.comboId);
      group.items.push(item);
      group.totalPrice += Number(item.effectiveUnitPrice) * item.quantity;
      return acc;
    }, new Map());

    return { individualItems, comboGroups };
  };

  if (loading) return <div className="text-center p-10">Loading cart...</div>;
  if (error) return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!cart || cart.items.length === 0) {
    return <div className="text-center p-10">Your cart is empty.</div>;
  }

  const { individualItems, comboGroups } = processCartItems(cart.items);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 font-medium text-gray-700">Product</th>
                <th className="text-center py-4 font-medium text-gray-700">Price</th>
                <th className="text-center py-4 font-medium text-gray-700">Quantity</th>
                <th className="text-right py-4 font-medium text-gray-700">Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* Render Individual Items */}
              {individualItems.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 py-4">
                  <td className="py-4 align-top">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 overflow-hidden rounded">
                        <Image src={item.product.imageUrl || "/placeholder.jpg"} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                      </div>
                    </div>
                  </td>
                  <td className="text-center py-4"><span className="font-medium">${Number(item.effectiveUnitPrice).toFixed(2)}</span></td>
                  <td className="text-center py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border border-gray-300 rounded-md">-</button>
                      <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} className="w-12 text-center border-0 font-medium" min="1" />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border border-gray-300 rounded-md">+</button>
                    </div>
                  </td>
                  <td className="text-right py-4"><span className="font-medium">${(Number(item.effectiveUnitPrice) * item.quantity).toFixed(2)}</span></td>
                  <td className="text-right py-4"><button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 ml-4">×</button></td>
                </tr>
              ))}

              {/* Render Combo Items */}
              {Array.from(comboGroups.entries()).map(([comboId, group]) => (
                <>
                  <tr key={`combo-header-${comboId}`} className="bg-gray-100">
                    <td colSpan="4" className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg text-blue-600">Combo: {group.comboName}</h3>
                        <span className="font-bold text-lg">${group.totalPrice.toFixed(2)}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4"><button onClick={() => handleRemoveCombo(comboId)} className="text-red-500 font-semibold">Remove Combo</button></td>
                  </tr>
                  {group.items.map(item => (
                    <tr key={item.id} className="border-b border-gray-100">
                       <td className="py-4 pl-8">
                         <div className="flex items-center space-x-4">
                           <div className="relative w-16 h-16 overflow-hidden rounded">
                             <Image src={item.product.imageUrl || "/placeholder.jpg"} alt={item.product.name} fill className="object-cover" />
                           </div>
                           <div>
                            <p>{item.product.name} (x{item.quantity})</p>
                            <p className="text-sm text-gray-500">Unit Price: ${Number(item.effectiveUnitPrice).toFixed(2)}</p>
                           </div>
                         </div>
                       </td>
                       <td className="text-center"></td>
                       <td className="text-center text-gray-500"> (In Combo) </td>
                       <td className="text-right"></td>
                       <td></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: Cart Total */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Cart total</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${Number(cart.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="text-gray-900 font-medium">Total amount</span>
              <span className="text-2xl font-bold text-gray-900">${Number(cart.total).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/checkout" legacyBehavior>
              <a className="block w-full text-center px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                Proceed to checkout
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/" legacyBehavior>
          <a className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
            Continue shopping
          </a>
        </Link>
        <button onClick={clearCart} className="w-full sm:w-auto px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default CartDetails;

