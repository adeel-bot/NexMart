"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { toast } from 'react-hot-toast';

// Interfaces based on Prisma schema and API responses
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

interface Combo {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  effectiveUnitPrice: number;
  product: Product;
  comboId?: number;
  combo?: Combo;
}

interface AddToCartParams {
  productId?: number;
  comboId?: number;
  quantity?: number;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
  isLoading: boolean;
  addToCart: (params: AddToCartParams) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
        setSubtotal(data.subtotal || 0);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error("Could not fetch cart.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async ({ productId, comboId, quantity = 1 }: AddToCartParams) => {
    if (!productId && !comboId) {
      toast.error("Product or combo ID must be provided.");
      return;
    }

    try {
      const body = comboId ? { comboId, quantity } : { productId, quantity };
      
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Added to cart!');
        await fetchCart();
      } else {
        toast.error(data.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (quantity < 1) {
      await removeItem(itemId);
      return;
    }
    try {
      const response = await fetch('/api/cart/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Cart updated');
        await fetchCart();
      } else {
        toast.error(data.error || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch('/api/cart/remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Item removed');
        await fetchCart();
      } else {
        toast.error(data.error || 'Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'POST',
      });
       if (response.ok) {
        toast.success('Cart cleared');
        await fetchCart();
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const refreshCart = async () => {
    await fetchCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        subtotal,
        itemCount,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};