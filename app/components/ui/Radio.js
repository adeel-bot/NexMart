"use client";
import React, { useState } from "react";

const Radio = ({}) => {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <label key={star}>
          <input
            type="radio"
            name="rating"
            value={star}
            onChange={() => setRating(star)}
            className="hidden"
          />
          <span
            className={`cursor-pointer text-2xl transition-colors duration-200 ${
              star <= (hover || rating)
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
          >
            ★
          </span>
        </label>
      ))}
    </div>
  );
};

export default Radio;
