"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth";

function ItemForm({ onItemCreated }) {
  const auth = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
  });
  const [error, setError] = useState(null);

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
      setError("Quantity måste vara ett giltigt tal.");
      return;
    }

    try {
      const response = await fetch("/api/Item", {
        method: "POST",
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
        const newItem = await response.json();
        setError(null);

        setFormData({
          name: "",
          description: "",
          quantity: "",
        });

        onItemCreated(newItem);
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Ett fel inträffade vid skapandet av objektet."
        );
      }
    } catch (error) {
      console.log("hej detta är felet", error);
      setError("Ett oväntat fel inträffade.");
    }
  };

  if (!auth.token) {
    window.location.href = "http://localhost:3000/";
    return null;
  }

  return (
    <div class="mid">
      <h2>Create New Item</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="Create" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
