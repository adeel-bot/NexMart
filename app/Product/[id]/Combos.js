"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../components/cards/ProductCard.js";

export default function Combos({ productId }) {
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchCombos = async () => {
      try {
        const res = await fetch(`/api/products/${productId}/combos`);
        if (!res.ok) {
          throw new Error("Failed to fetch combos");
        }
        const data = await res.json();
        setCombos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCombos();
  }, [productId]);

  if (loading) {
    return <div className="text-center py-8">Loading combos...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  }

  if (combos.length === 0) {
    return <div className="text-center py-8">No combos found for this product.</div>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-8">Combos</h2>

      {/* Stacked Combo Sections – No outer grid */}
      <div className="space-y-12">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{combo.name}</h3>
            {combo.description && (
              <p className="text-gray-600 mb-6">{combo.description}</p>
            )}

            {/* Grid ONLY for the items in this combo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {combo.items.map((item, idx) => (
                <div key={idx} className="flex justify-center">
                  <ProductCard product={item.product} comboDetails={combo} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}