import { useState } from 'react';
import { addProduct } from '../services/api';

export default function Admin() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({ name, price: Number(price) });
      alert(`Added: ${name} – ₹${price}`);
      setName(''); setPrice('');
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
}
