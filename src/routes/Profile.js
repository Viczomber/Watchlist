import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore';
import ReviewCard from '../components/ReviewCard'; // Componente para mostrar reseñas

export default function Profile() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (!usr) {
        setReviews([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function fetchReviews() {
      setLoading(true);
      try {
        const q = query(collection(db, 'users', user.uid, 'reviews'));
        const querySnapshot = await getDocs(q);
        const revs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(revs);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [user]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) {
    return (
      <div style={{ padding: 20, textAlign: 'center' }}>
        <h2>No has iniciado sesión</h2>
        <p>Por favor inicia sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '20px auto',
        padding: 20,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 30 }}>
        <img
          src={user.photoURL || 'https://via.placeholder.com/100?text=User'}
          alt={user.displayName || 'Usuario'}
          style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <h2 style={{ marginBottom: 5 }}>{user.displayName || 'Usuario Anónimo'}</h2>
          <p style={{ color: '#555' }}>{user.email}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 10,
              backgroundColor: '#f4a261',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 8,
              color: 'white',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e07b39')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#f4a261')}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <h3>Reseñas guardadas</h3>
      {loading ? (
        <p>Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p>No tienes reseñas guardadas.</p>
      ) : (
        <div style={{ display: 'grid', gap: 15 }}>
          {reviews.map((rev) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      )}
    </div>
  );
}
