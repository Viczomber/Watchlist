import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddToTopList() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('anime');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    if (!title || !type || !id || !image) {
      return setMessage('Por favor completa todos los campos.');
    }

    try {
      await addDoc(collection(db, 'toplist'), {
        title,
        type,
        id,
        image,
        createdAt: new Date(),
      });
      setMessage('✅ Agregado con éxito');
      setTitle('');
      setType('anime');
      setId('');
      setImage('');
    } catch (error) {
      console.error('Error agregando a TopList:', error);
      setMessage('❌ Ocurrió un error al guardar');
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: '0 auto' }}>
      <h2>Agregar a la lista Top</h2>

      <label>Título:</label>
      <input value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>Tipo:</label>
      <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', marginBottom: 10 }}>
        <option value="anime">Anime</option>
        <option value="kdrama">K-Drama</option>
      </select>

      <label>ID del contenido (API):</label>
      <input value={id} onChange={e => setId(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>URL de la imagen:</label>
      <input value={image} onChange={e => setImage(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <button onClick={handleAdd} style={{ padding: 10, background: '#6a5acd', color: '#fff', border: 'none', borderRadius: 6 }}>
        Agregar
      </button>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
