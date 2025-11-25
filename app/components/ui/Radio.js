"use client";
import React from "react";

const Radio = ({ rating = 0 }) => {
  // Ensure rating is number and between 0-5
  const validRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  // Round to nearest 0.5
  const roundedRating = Math.round(validRating * 2) / 2;

  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex pl-1 gap-1">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400 text-2xl">
          ★
        </span>
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <span className="relative inline-block w-5 text-2xl">
          <span className="text-yellow-400 absolute left-0 w-1/2 overflow-hidden">
            ★
          </span>
          <span className="text-gray-400">★</span>
        </span>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-400 text-2xl">
          ★
        </span>
      ))}
    </div>
  );
};

export default Radio;
