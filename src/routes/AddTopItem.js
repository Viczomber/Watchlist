// src/routes/AddTopItem.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddTopItem() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('anime');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Agrega un título');

    try {
      await addDoc(collection(db, 'toplist'), {
        title,
        type,
        image,
        createdAt: new Date(),
      });
      alert('Agregado al Top');
      setTitle('');
      setImage('');
    } catch (err) {
      console.error(err);
      alert('Error al agregar');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '20px auto' }}>
      <h2>Añadir al Top</h2>
      <form onSubmit={handleSubmit}>
        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%' }} />
        <label>Tipo</label>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%' }}>
          <option value="anime">Anime</option>
          <option value="kdrama">K-Drama</option>
        </select>
        <label>Imagen (URL opcional)</label>
        <input value={image} onChange={(e) => setImage(e.target.value)} style={{ width: '100%' }} />
        <button type="submit" style={{ marginTop: 10 }}>Guardar</button>
      </form>
    </div>
  );
}
