"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/auth";
import ItemForm from "./ItemForm";
import UpdateItemForm from "./UpdateItemForm";

function ItemList() {
  const auth = useAuth();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch("/api/Item", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch items.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  }, [auth.token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleItemCreated = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemUpdated = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItem(null);
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`/api/Item/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred.");
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
  };

  if (!auth.token) {
    window.location.href = "http://localhost:3000/";
    return null;
  }

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ItemForm onItemCreated={handleItemCreated} />
      {editingItem && (
        <UpdateItemForm item={editingItem} onItemUpdated={handleItemUpdated} />
      )}
      <div className="rub">
        <h2>Name</h2>
        <h2>Description</h2>
        <h2>Quantity</h2>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong>
            </div>
            <div>{item.description}</div>
            <div>{item.quantity}</div>
            <button class="edit" onClick={() => startEditing(item)}>
              Edit
            </button>
            <button class="del" onClick={() => handleDeleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
