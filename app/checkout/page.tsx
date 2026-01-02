"use client";

import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";
import "./Checkout.css";
import { toast } from "react-hot-toast";

const CheckoutPage = () => {
  const { items, subtotal, total, refreshCart, itemCount } = useCart();
  const { user } = useUser();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to place an order.");
      router.push("/login");
      return;
    }

    if (itemCount === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
      });

      if (response.ok) {
        const order = await response.json();
        toast.success(`Order #${order.id} placed successfully!`);
        await refreshCart();
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to place order.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-summary">
        <h2>Order Summary</h2>
        <ul className="cart-items-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.product.imageUrl || "/placeholder.png"}
                  alt={item.product.name}
                />
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="cart-item-price">
                ${(item.effectiveUnitPrice * item.quantity).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <div className="summary-item">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address..."
          disabled={isLoading}
        />
      </div>

      <button
        onClick={handlePlaceOrder}
        className="place-order-button"
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Place Your Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;
