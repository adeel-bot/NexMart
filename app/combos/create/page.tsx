'use client';

import React, { useState } from 'react';
import { useUser } from '../../../context/UserContext';
import { useRouter } from 'next/navigation';

// Basic product interface for selection
interface Product {
    id: number;
    name: string;
    price: string;
}

const CreateComboPage = () => {
    const { user } = useUser();
    const router = useRouter();
    const [comboName, setComboName] = useState('');
    const [comboDescription, setComboDescription] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Map<number, number>>(new Map()); // Map<productId, quantity>

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                if (res.ok) {
                    const data = await res.json();
                    setProducts(data);
                }
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    const handleProductQuantityChange = (productId: number, quantity: number) => {
        const newSelectedProducts = new Map(selectedProducts);
        if (quantity > 0) {
            newSelectedProducts.set(productId, quantity);
        } else {
            newSelectedProducts.delete(productId);
        }
        setSelectedProducts(newSelectedProducts);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user || selectedProducts.size === 0 || !comboName) {
            alert('Please name your combo and select at least one product.');
            return;
        }

        const items = Array.from(selectedProducts.entries()).map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            return {
                productId,
                quantity,
                unitPrice: product ? parseFloat(product.price) : 0,
            };
        });

        try {
            const res = await fetch('/api/combos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: user.id,
                    name: comboName,
                    description: comboDescription,
                    items: items,
                    isSaved: true,
                }),
            });

            if (res.ok) {
                alert('Combo created successfully!');
                router.push('/combos');
            } else {
                const errorData = await res.json();
                alert(`Failed to create combo: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Failed to create combo', error);
            alert('An error occurred while creating the combo.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Create a New Combo</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="comboName" className="block text-lg font-medium mb-2">Combo Name</label>
                    <input
                        id="comboName"
                        type="text"
                        value={comboName}
                        onChange={(e) => setComboName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="comboDescription" className="block text-lg font-medium mb-2">Description (Optional)</label>
                    <textarea
                        id="comboDescription"
                        value={comboDescription}
                        onChange={(e) => setComboDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <h2 className="text-2xl font-bold mb-4">Select Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <div key={product.id} className="border rounded-lg p-4 shadow">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="font-bold text-lg">${product.price}</p>
                            <input
                                type="number"
                                min="0"
                                placeholder="Quantity"
                                className="w-full border rounded px-3 py-2 mt-2"
                                onChange={(e) => handleProductQuantityChange(product.id, parseInt(e.target.value, 10) || 0)}
                            />
                        </div>
                    ))}
                </div>

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6">
                    Save Combo
                </button>
            </form>
        </div>
    );
};

export default CreateComboPage;
