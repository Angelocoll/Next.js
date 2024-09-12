"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";

function UpdateItemForm({ item, onItemUpdated }) {
  const auth = useAuth();
  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
    quantity: item.quantity,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setFormData({
      name: item.name,
      description: item.description,
      quantity: item.quantity,
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isNaN(formData.quantity) || formData.quantity === "") {
      setError("Quantity must be a valid number.");
      return;
    }

    try {
      const response = await fetch(`/api/Item/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          quantity: Number(formData.quantity),
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        setError(null);
        onItemUpdated(updatedItem);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "An error occurred while updating the item."
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div class="big">
      <h2>Update Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form class="up" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
}

export default UpdateItemForm;
