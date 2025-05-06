import React, { useState, useEffect } from "react";

// App Component
function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0 });
  const [editItem, setEditItem] = useState(null);

  // Fetch items from backend
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Create a new item
  const createItem = async () => {
    const res = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    const createdItem = await res.json();
    setItems([...items, createdItem]);
    setNewItem({ name: "", quantity: 0 });
  };

  // Edit an item
  const handleEdit = (item) => {
    setEditItem(item);
  };

  // Update an item
  const updateItem = async () => {
    const res = await fetch(`http://localhost:5000/items/${editItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editItem),
    });
    const updatedItem = await res.json();
    setItems(
      items.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
    setEditItem(null);
  };

  // Delete an item
  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, {
      method: "DELETE",
    });
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="App">
      <h1>CRUD Operations with MongoDB</h1>

      {/* Add New Item */}
      <div>
        <h3>Create New Item</h3>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item Name"
        />
        <input
          type="number"
          value={newItem.quantity}
          onChange={(e) =>
            setNewItem({ ...newItem, quantity: parseInt(e.target.value) })
          }
          placeholder="Quantity"
        />
        <button onClick={createItem}>Add Item</button>
      </div>

      {/* Edit Item */}
      {editItem && (
        <div>
          <h3>Edit Item</h3>
          <input
            type="text"
            value={editItem.name}
            onChange={(e) =>
              setEditItem({ ...editItem, name: e.target.value })
            }
            placeholder="Item Name"
          />
          <input
            type="number"
            value={editItem.quantity}
            onChange={(e) =>
              setEditItem({ ...editItem, quantity: parseInt(e.target.value) })
            }
            placeholder="Quantity"
          />
          <button onClick={updateItem}>Update Item</button>
        </div>
      )}

      {/* Display Items */}
      <div>
        <h3>Item List</h3>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <span>{item.name} - {item.quantity}</span>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
