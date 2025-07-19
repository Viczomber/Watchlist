import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAnimeDetails } from '../api/kitsu';
import RatingStars from '../components/RatingStars';
import ReviewBox from '../components/ReviewBox';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [rating, setRating] = useState(0);
  const [savedReview, setSavedReview] = useState('');
  const [user, setUser] = useState(null);

  // Detectar usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Obtener detalles del anime
  useEffect(() => {
    async function fetchAnime() {
      const data = await getAnimeDetails(id);
      setAnime(data);
    }
    fetchAnime();
  }, [id]);

  // Cargar reseña guardada para este usuario y anime
  useEffect(() => {
    const fetchReview = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid, 'reviews', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setRating(data.rating || 0);
        setSavedReview(data.review || '');
      }
    };
    fetchReview();
  }, [user, id]);

  // Guardar reseña y rating en Firestore
  const handleSave = async (reviewText) => {
    if (!user) return alert('Inicia sesión para guardar reseñas');

    setSavedReview(reviewText);
    const docRef = doc(db, 'users', user.uid, 'reviews', id);
    await setDoc(docRef, {
      contentId: id,
      title:
        anime?.attributes.titles.en_jp ||
        anime?.attributes.titles.en ||
        anime?.attributes.titles.ja_jp ||
        'Sin título',
      rating,
      review: reviewText,
      userEmail: user.email,
      createdAt: new Date(),
    });
    alert('Reseña guardada');
  };

  if (!anime) return <p>Cargando detalles...</p>;

  const title =
    anime.attributes.titles.en_jp ||
    anime.attributes.titles.en ||
    anime.attributes.titles.ja_jp ||
    'Sin título';

  const poster = anime.attributes.posterImage?.medium;

  return (
    <div style={{ padding: 20 }}>
      <h1>{title}</h1>
      {poster && <img src={poster} alt={title} style={{ maxWidth: '300px', borderRadius: '10px' }} />}
      <p>{anime.attributes.synopsis || 'No hay sinopsis disponible'}</p>

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
