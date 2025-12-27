'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import Link from 'next/link';

interface Combo {
  id: number;
  name: string;
  description: string | null;
  totalPrice: string;
  isSaved: boolean;
  items: {
    id: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

const CombosPage = () => {
  const { user } = useUser();
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCombos = async () => {
      if (user) {
        try {
          const res = await fetch(`/api/combos?customerId=${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setCombos(data);
          }
        } catch (error) {
          console.error('Failed to fetch combos', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCombos();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <h1>My Combos</h1>
        <p>Please <Link href="/login">login</Link> to see your combos.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Combos</h1>
        <Link href="/combos/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create New Combo
        </Link>
      </div>
      
      {combos.length === 0 ? (
        <p>You don't have any saved combos yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combos.map((combo) => (
            <div key={combo.id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold mb-2">{combo.name}</h2>
              {combo.description && <p className="text-gray-600 mb-2">{combo.description}</p>}
              <p className="font-bold text-lg mb-2">${combo.totalPrice}</p>
              <h3 className="font-semibold">Items:</h3>
              <ul className="list-disc list-inside">
                {combo.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} x {item.product.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CombosPage;
