"use client";
import React, { useState } from "react";
import Radio from "../../components/ui/Radio";

export default function Reviews({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  // random reviews data
  const reviews = [
    {
      id: 1,
      user: "John Doe",
      rating: 4.5,
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      user: "Jane Smith",
      rating: 4.0,
      comment: "Pellentesque habitant morbi tristique senectus et netus.",
    },
    {
      id: 3,
      user: "Alice Johnson",
      rating: 5,
      comment: "Fusce vel sem at sapien iaculis accumsan.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex justify-center items-center  gap-4 mb-6">
        <button
          className={`p-3 rounded-2xl border font-semibold transition-all will-change-transform duration-200 ${
            activeTab === "description"
              ? "bg-yellow-500 text-white border-yellow-500"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`p-3 rounded-2xl border font-semibold will-change-transform transition-all duration-200 ${
            activeTab === "reviews"
              ? "bg-yellow-500 text-white border-yellow-500"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "description" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm text-gray-700">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description} <br/>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eligendi dolorum quos nam. Laboriosam vel nulla quas harum! Totam, quo!
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="grid grid-cols-3 gap-7 px-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{review.user}</h3>
                <div className="flex items-center gap-2">
                  <Radio rating={review.rating} />
                  <span className="text-gray-600 text-sm">
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </div>
          ))}
          {/* Placeholder for adding a review */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500">
            No more reviews yet. Be the first to review {product.name}!
          </div>
        </div>
      )}
    </div>
  );
}
