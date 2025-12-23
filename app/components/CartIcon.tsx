// components/CartIcon.tsx
"use client";

import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

const CartIcon = () => {
  const { itemCount, isLoading } = useCart();

  return (
    <Link href="/Cart" className="relative">
      <FiShoppingCart className="w-6 h-6 text-[#1B5A7D] hover:text-[#003F62] transition-colors" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#EDA415] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;