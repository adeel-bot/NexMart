"use client";
import React from "react";

const Radio = ({ rating = 0 }) => {
  // Clamp rating between 0 and 5
  const validRating = Math.min(Math.max(Number(rating) || 0, 0), 5);

  const fullStars = Math.floor(validRating);
  const decimal = validRating - fullStars;

  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
  const adjustedFullStars = decimal >= 0.75 ? fullStars + 1 : fullStars;
  const emptyStars = 5 - adjustedFullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex pl-1 gap-1">
      {/* Full Stars */}
      {[...Array(adjustedFullStars)].map((_, i) => (
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
