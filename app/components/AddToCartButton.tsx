// components/AddToCartButton.tsx
"use client";

import { useState } from 'react';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

interface AddToCartButtonProps {
  productId: number;
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
  comboDetails?: {
    id: number;
    name: string;
    description?: string;
    price: number; // The combo price
    items: Array<{
      productId: number;
      product: any; // You might want to define a more specific type for product
    }>;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  className = '',
  showIcon = true,
  showText = true,
  comboDetails,
}) => {
  const { addToCart, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const itemInCart = items.find(item => item.productId === productId && (!comboDetails || item.comboId === comboDetails.id));

  const handleAddToCart = async () => {
    if (isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(productId, 1, comboDetails);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex items-center justify-center gap-2 bg-[#EDA415] hover:bg-[#ffb432] text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isAdding ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          {showText && <span>Adding...</span>}
        </>
      ) : added || itemInCart ? (
        <>
          {showIcon && <FiCheck className="w-4 h-4" />}
          {showText && <span>Added to Cart</span>}
        </>
      ) : (
        <>
          {showIcon && <FiShoppingCart className="w-4 h-4" />}
          {showText && <span>Add to Cart</span>}
        </>
      )}
    </button>
  );
};

export default AddToCartButton;