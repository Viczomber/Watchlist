import React, { useEffect, useState } from 'react';
import { getPopularAnimes } from '../api/kitsu';
import { getPopularKdramas } from '../api/tmdb';
import CardItem from '../components/CardItem';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [kdramas, setKdramas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [animeData, kdramaData] = await Promise.all([
          getPopularAnimes(),
          getPopularKdramas(),
        ]);
        setAnimes(animeData);
        setKdramas(kdramaData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '20px',
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>🎥 Recomendaciones Populares</h1>

      {loading && <p style={{ textAlign: 'center' }}>Cargando...</p>}

      {!loading && (
        <>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '15px' }}>📺 Animes</h2>
            <div style={gridStyle}>
              {animes.map((anime) => {
                const attr = anime.attributes;
                const title = attr.titles.en_jp || attr.titles.en || attr.titles.ja_jp || 'Sin título';
                const poster = attr.posterImage?.medium || '';
                const year = attr.startDate?.split('-')[0] || 'N/A';
                const rating = attr.averageRating || 'N/A';

                return (
                  <CardItem
                    key={anime.id}
                    to={`/anime/${anime.id}`}
                    imageSrc={poster}
                    title={title}
                    year={year}
                    rating={rating}
                  />
                );
              })}
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '15px' }}>🎭 K-Dramas</h2>
            <div style={gridStyle}>
              {kdramas.map((drama) => {
                const poster = drama.poster_path
                  ? `https://image.tmdb.org/t/p/w300${drama.poster_path}`
                  : 'https://via.placeholder.com/150x225?text=Sin+imagen';
                const year = drama.first_air_date?.split('-')[0] || 'N/A';
                const rating = drama.vote_average ? drama.vote_average.toFixed(1) : 'N/A';

                return (
                  <CardItem
                    key={drama.id}
                    to={`/detail/${drama.id}`}
                    imageSrc={poster}
                    title={drama.name}
                    year={year}
                    rating={rating}
                  />
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
