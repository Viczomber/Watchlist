import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchAnime } from '../api/kitsu';
import { searchKdramas } from '../api/tmdb';

export default function Search() {
  const [query, setQuery] = useState('');
  const [animeResults, setAnimeResults] = useState([]);
  const [kdramaResults, setKdramaResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return alert('Escribe un término para buscar');
    setLoading(true);
    try {
      const animes = await searchAnime(query);
      const kdramas = await searchKdramas(query);
      setAnimeResults(animes);
      setKdramaResults(kdramas);
    } catch (error) {
      alert('Error buscando: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    display: 'flex',
    gap: '10px',
    padding: 10,
    borderRadius: 10,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: 15,
    transition: 'transform 0.2s ease',
    textDecoration: 'none',
    color: 'inherit',
  };



  const imgStyle = {
    width: 90,
    height: 130,
    objectFit: 'cover',
    borderRadius: 8,
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Buscar Animes y K-Dramas</h1>
      <input
        type="text"
        placeholder="Escribe el nombre de un anime o kdrama"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, fontSize: 16, width: '60%', marginRight: 10 }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 15px', fontSize: 16 }}>
        Buscar
      </button>

      {loading && <p>Cargando resultados...</p>}

      <h2>Animes</h2>
      {animeResults.length === 0 && !loading && <p>No hay resultados</p>}
      <div>
        {animeResults.map((anime) => {
          const title =
            anime.attributes.titles.en_jp ||
            anime.attributes.titles.en ||
            anime.attributes.titles.ja_jp ||
            'Sin título';
          const poster = anime.attributes.posterImage?.medium;

          return (
            <Link
              key={anime.id}
              to={`/anime/${anime.id}`}
              style={cardStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={poster} alt={title} style={imgStyle} />
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14 }}>
                  {anime.attributes.synopsis?.slice(0, 120)}...
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <h2>K-Dramas</h2>
      {kdramaResults.length === 0 && !loading && <p>No hay resultados</p>}
      <div>
        {kdramaResults.map((drama) => (
          <Link
            key={drama.id}
            to={`/detail/${drama.id}`}
            style={cardStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img
              src={
                drama.poster_path
                  ? `https://image.tmdb.org/t/p/w300${drama.poster_path}`
                  : 'https://via.placeholder.com/90x130?text=Sin+imagen'
              }
              alt={drama.name}
              style={imgStyle}
            />
            <div>
              <h3 style={{ margin: '0 0 5px 0' }}>{drama.name}</h3>
              <p style={{ margin: 0, fontSize: 14 }}>
                {drama.overview?.slice(0, 120) || 'No hay descripción'}...
              </p>
              <small>Rating: {drama.vote_average || 'N/A'}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
