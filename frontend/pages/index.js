import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My E-Commerce Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-gray-600">₹{p.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
