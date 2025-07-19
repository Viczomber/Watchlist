import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKdramaDetails, getKdramaCredits } from '../api/tmdb';
import RatingStars from '../components/RatingStars';
import ReviewBox from '../components/ReviewBox';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Detail() {
  const { id } = useParams();
  const [drama, setDrama] = useState(null);
  const [cast, setCast] = useState([]);
  const [rating, setRating] = useState(0);
  const [savedReview, setSavedReview] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Detectar usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Cargar detalles y actores
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const d = await getKdramaDetails(id);
        const c = await getKdramaCredits(id);

        if (!d) throw new Error('No se encontraron detalles del drama');

        setDrama(d);
        setCast(Array.isArray(c) ? c : []);
      } catch (e) {
        console.error(e);
        setError(e.message);
        setDrama(null);
        setCast([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  // Cargar reseña guardada por usuario
  useEffect(() => {
    if (!user) return;
    async function fetchReview() {
      try {
        const docRef = doc(db, 'users', user.uid, 'reviews', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setRating(data.rating || 0);
          setSavedReview(data.review || '');
        } else {
          setRating(0);
          setSavedReview('');
        }
      } catch (e) {
        console.error('Error cargando reseña:', e);
      }
    }
    fetchReview();
  }, [user, id]);

  // Guardar reseña
  const handleSave = async (reviewText) => {
    if (!user) return alert('Inicia sesión para guardar reseñas');
    try {
      setSavedReview(reviewText);
      const docRef = doc(db, 'users', user.uid, 'reviews', id);
      await setDoc(docRef, {
        contentId: id,
        title: drama?.name,
        rating,
        review: reviewText,
        userEmail: user.email,
        createdAt: new Date(),
      });
      alert('Reseña guardada');
    } catch (e) {
      alert('Error guardando reseña: ' + e.message);
    }
  };

  // Manejo de estados visuales
  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!drama) return <p>No se encontró el drama</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{drama.name}</h1>

      {drama.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${drama.poster_path}`}
          alt={drama.name}
          style={{ float: 'left', marginRight: 20, borderRadius: 10 }}
        />
      ) : (
        <div
          style={{
            width: 300,
            height: 450,
            background: '#ccc',
            float: 'left',
            marginRight: 20,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#666',
            fontStyle: 'italic',
          }}
        >
          No hay imagen disponible
        </div>
      )}

      <p><strong>Sinopsis:</strong> {drama.overview || 'No disponible'}</p>

      <h3>Actores principales</h3>
      <ul>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <li key={actor.id}>
              {actor.name} como <em>{actor.character}</em>
            </li>
          ))
        ) : (
          <li>No se encontraron actores</li>
        )}
      </ul>

      {user && (
        <>
          <h3>Tu calificación</h3>
          <RatingStars value={rating} onChange={setRating} />
          <ReviewBox onSave={handleSave} />
          {savedReview && (
            <div style={{ background: '#eee', padding: 10, marginTop: 10 }}>
              <strong>Tu reseña guardada:</strong>
              <p>{savedReview}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
