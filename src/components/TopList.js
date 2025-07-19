import React, { useEffect, useState } from 'react';
import { getPopularAnimes } from '../api/kitsu';
import { getPopularKdramas } from '../api/tmdb';
import { Link } from 'react-router-dom';

export default function TopList() {
  const [animes, setAnimes] = useState([]);
  const [kdramas, setKdramas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [animeData, kdramaData] = await Promise.all([getPopularAnimes(), getPopularKdramas()]);
        setAnimes(animeData.slice(0, 10));
        setKdramas(kdramaData.slice(0, 10));
      } catch (error) {
        console.error('Error fetching top data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p style={{ padding: 20, textAlign: 'center' }}>Cargando top 10...</p>;

  const cardStyle = {
    borderRadius: 12,
    boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
    padding: 10,
    marginBottom: 15,
    display: 'flex',
    gap: 15,
    background: '#fff',
    textDecoration: 'none',
    color: 'inherit',
    alignItems: 'center',
  };

  const imgStyle = {
    width: 70,
    height: 100,
    objectFit: 'cover',
    borderRadius: 8,
  };

  return (
    <div style={{ padding: 20, maxWidth: 900, margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Top 10 Animes y K-Dramas</h1>

      <section>
        <h2>Animes</h2>
        {animes.map((anime, idx) => {
          const title = anime.attributes.titles.en_jp || anime.attributes.titles.en || 'Sin título';
          return (
            <Link key={anime.id} to={`/anime/${anime.id}`} style={cardStyle}>
              <span style={{ fontWeight: 'bold', width: 30 }}>{idx + 1}.</span>
              <img src={anime.attributes.posterImage?.medium} alt={title} style={imgStyle} />
              <div>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14 }}>{anime.attributes.synopsis?.slice(0, 100)}...</p>
              </div>
            </Link>
          );
        })}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>K-Dramas</h2>
        {kdramas.map((drama, idx) => (
          <Link key={drama.id} to={`/detail/${drama.id}`} style={cardStyle}>
            <span style={{ fontWeight: 'bold', width: 30 }}>{idx + 1}.</span>
            <img
              src={
                drama.poster_path
                  ? `https://image.tmdb.org/t/p/w300${drama.poster_path}`
                  : 'https://via.placeholder.com/70x100?text=Sin+imagen'
              }
              alt={drama.name}
              style={imgStyle}
            />
            <div>
              <h3 style={{ margin: 0 }}>{drama.name}</h3>
              <p style={{ margin: 0, fontSize: 14 }}>{drama.overview?.slice(0, 100) || 'No descripción'}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
