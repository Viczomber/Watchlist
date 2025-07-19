// src/routes/Watchlist.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('anime'); // anime o kdrama
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    setLoading(true);
    const q = query(collection(db, 'watchlist'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const addItem = async () => {
    if (!title.trim()) return alert('Escribe un título');
    await addDoc(collection(db, 'watchlist'), {
      title,
      type,
      createdAt: new Date(),
    });
    setTitle('');
    fetchWatchlist();
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'watchlist', id));
    fetchWatchlist();
  };

  return (
    <div style={{ padding: '20px', maxWidth: 600, margin: 'auto' }}>
      <h2>📌 Animes y K-Dramas por Ver</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: '8px' }}>
          <option value="anime">Anime</option>
          <option value="kdrama">K-Drama</option>
        </select>
        <button onClick={addItem} style={{ padding: '8px 12px' }}>
          ➕ Agregar
        </button>
      </div>

      {loading ? (
        <p>Cargando lista...</p>
      ) : items.length === 0 ? (
        <p>No tienes títulos en la lista por ver.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                padding: '10px',
                marginBottom: '8px',
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                <strong>{item.title}</strong> <span style={{ color: '#888' }}>({item.type})</span>
              </span>
              <button
                onClick={() => deleteItem(item.id)}
                style={{
                  background: '#e76f51',
                  border: 'none',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                🗑️ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
