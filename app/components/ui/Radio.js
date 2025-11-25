"use client";
import React from "react";

const Radio = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;

  // half star only if between 0.25 – 0.75 (common rating UX)
  const hasHalfStar = decimal >= 0.25 && decimal < 0.75;

  // if decimal > 0.75, round up visually to a full star
  const adjustedFullStars = decimal >= 0.75 ? fullStars + 1 : fullStars;

  const emptyStars = 5 - adjustedFullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex pl-1 gap-1">
      {/* Full Stars */}
      {[...Array(adjustedFullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-400 text-2xl">★</span>
      ))}

      {/* Half Star */}
      {hasHalfStar && (
        <span className="relative inline-block w-5 text-2xl">
          <span className="text-yellow-400 absolute left-0 w-1/2 overflow-hidden">★</span>
          <span className="text-gray-400">★</span>
        </span>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-400 text-2xl">★</span>
      ))}
    </div>
  );
};

export default Radio;
