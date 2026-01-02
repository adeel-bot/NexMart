
"use client";
import React, { useState } from "react";
import { Product } from "./AdminDashboard";
import "./CreateComboForm.css";

interface ComboItem {
  productId: number;
  quantity: number;
}

interface CreateComboFormProps {
  products: Product[];
  onClose: () => void;
  onSubmit: (comboData: any) => Promise<void>;
  adminId: number;
}

const CreateComboForm: React.FC<CreateComboFormProps> = ({
  products,
  onClose,
  onSubmit,
  adminId,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState<ComboItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    setItems([...items, { productId: 0, quantity: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: "productId" | "quantity",
    value: string
  ) => {
    const newItems = [...items];
    if (field === "productId") {
      newItems[index].productId = parseInt(value, 10);
    } else {
      newItems[index].quantity = parseInt(value, 10);
    }
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !price || items.length === 0) {
      setError("Name, price, and at least one item are required.");
      return;
    }

    const comboData = {
      name,
      description,
      price: parseFloat(price),
      isActive: true,
      adminId,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    };

    await onSubmit(comboData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Create New Combo</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="name">Combo Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <h3>Combo Items</h3>
            {items.map((item, index) => (
              <div key={index} className="combo-item-row">
                <select
                  value={item.productId}
                  onChange={(e) =>
                    handleItemChange(index, "productId", e.target.value)
                  }
                >
                  <option value={0} disabled>
                    Select a product
                  </option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="remove-item-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="add-item-btn"
            >
              Add Product
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Create Combo
            </button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComboForm;
