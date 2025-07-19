import React, { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

export default function AddToTopButton({ contentId, title, type, poster }) {
  const [inTopList, setInTopList] = useState(false);

  useEffect(() => {
    const check = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const ref = doc(db, 'users', user.uid, 'topList', contentId);
      const snap = await getDoc(ref);
      setInTopList(snap.exists());
    };
    check();
  }, [contentId]);

  const handleToggle = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Inicia sesión para usar Top 10');

    const ref = doc(db, 'users', user.uid, 'topList', contentId);
    if (inTopList) {
      await deleteDoc(ref);
      setInTopList(false);
    } else {
      await setDoc(ref, {
        contentId,
        title,
        type,
        poster,
        addedAt: new Date(),
      });
      setInTopList(true);
    }
  };

  return (
    <button onClick={handleToggle} style={{ marginTop: 10 }}>
      {inTopList ? 'Quitar de Top 10' : 'Agregar a Top 10'}
    </button>
  );
}
