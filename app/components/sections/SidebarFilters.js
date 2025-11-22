"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SidebarFilters({ onFilterChange }) {
  const [openSection, setOpenSection] = useState(null);
  const [filters, setFilters] = useState({});

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleCheck = (section, item) => {
    setFilters((prev) => {
      const prevValues = prev[section] || [];
      const newValues = prevValues.includes(item)
        ? prevValues.filter((v) => v !== item)
        : [...prevValues, item];

      const updated = { ...prev, [section]: newValues };
      onFilterChange && onFilterChange(updated);
      return updated;
    });
  };

  const sections = [
    { label: "Categories", items: ["Shoes", "Clothing", "Accessories", "Electronics"] },
    { label: "Availability", items: ["In Stock", "Out of Stock"] },
    { label: "Product Type", items: ["Sneakers", "T-Shirts", "Bags", "Watches"] },
    { label: "Brand", items: ["Nike", "Adidas", "Apple", "Samsung"] },
    { label: "Color", items: ["Red", "Blue", "Black", "White"] },
    { label: "Size", items: ["S", "M", "L", "XL"] },
  ];

  return (
    <div className="w-70 h-screen sticky top-4 bg-white p-4 border rounded-xl shadow-md overflow-y-auto space-y-4">
      {sections.map((section) => (
        <div key={section.label} className="border-b pb-2">
          <button
            onClick={() => toggleSection(section.label)}
            className="w-full flex justify-between items-center text-left font-semibold text-lg"
          >
            {section.label}
            <span className="text-xl">{openSection === section.label ? "-" : "+"}</span>
          </button>

          <AnimatePresence>
            {openSection === section.label && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden mt-2 space-y-1 pl-2"
              >
                {section.items.map((item) => (
                  <label key={item} className="flex items-center space-x-2 text-sm select-none">
                    <input
                      type="checkbox"
                      checked={filters[section.label]?.includes(item) || false}
                      onChange={() => handleCheck(section.label, item)}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
