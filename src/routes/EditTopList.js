// src/routes/EditTopList.js
import React, { useState } from 'react';
import { topList } from '../data/toplist';

export default function EditTopList() {
  const [list, setList] = useState(topList);

  const handleChange = (index, field, value) => {
    const newList = [...list];
    newList[index][field] = value;
    setList(newList);
  };

  const handleAdd = () => {
    setList([
      ...list,
      { id: String(Date.now()), title: '', image: '', description: '', type: 'anime' },
    ]);
  };

  const handleDelete = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Editar Top Personal</h2>
      {list.map((item, index) => (
        <div key={item.id} style={{ marginBottom: 20, borderBottom: '1px solid #ccc' }}>
          <input
            placeholder="Título"
            value={item.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
          />
          <input
            placeholder="Imagen URL"
            value={item.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
          />
          <input
            placeholder="Descripción"
            value={item.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />
          <select
            value={item.type}
            onChange={(e) => handleChange(index, 'type', e.target.value)}
          >
            <option value="anime">Anime</option>
            <option value="kdrama">K-Drama</option>
          </select>
          <button onClick={() => handleDelete(index)}>Eliminar</button>
        </div>
      ))}
      <button onClick={handleAdd}>Agregar nuevo</button>
      <p style={{ marginTop: 20, color: 'gray' }}>
        ⚠️ Esto no se guarda aún en Firebase. Si quieres eso, te ayudo a conectarlo.
      </p>
    </div>
  );
}
