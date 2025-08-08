import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Backend API Base URL
const api = axios.create({ baseURL: 'http://localhost:8088/api/products' });

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async () => {
    try {
      await api.post('', newProduct);
      setNewProduct({ name: '', description: '', price: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <button onClick={createProduct}>Add Product</button>

      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> - {p.description} - ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
