const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Buscar K-Dramas por nombre
export async function searchKdramas(query) {
  try {
    const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.results || [];
  } catch {
    return [];
  }
}

// Obtener detalles de un K-Drama por ID
export async function getKdramaDetails(id) {
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-ES`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error('Error al obtener detalles del kdrama:', error);
    return null;
  }
}

// Obtener reparto de un K-Drama por ID
export async function getKdramaCredits(id) {
  try {
    const res = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
    const json = await res.json();
    return json.cast ? json.cast.slice(0, 5) : [];
  } catch (error) {
    console.error('Error al obtener créditos del kdrama:', error);
    return [];
  }
}

// Obtener K-Dramas populares
export async function getPopularKdramas() {
  try {
    const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const json = await res.json();
    return json.results || [];
  } catch {
    return [];
  }
}
