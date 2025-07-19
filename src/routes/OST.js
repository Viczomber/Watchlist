import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function OST() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchOST() {
      const snapshot = await getDocs(collection(db, 'ost'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTracks(data);
    }
    fetchOST();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>🎶 OSTs Favoritas</h2>
      {tracks.map((t) => (
        <div key={t.id} style={{ marginBottom: 20 }}>
          <h4>{t.title}</h4>
          {t.url && <audio controls src={t.url}></audio>}
        </div>
      ))}
    </div>
  );
}
