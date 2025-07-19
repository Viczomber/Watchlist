export async function searchAnime(query) {
  try {
    const res = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(query)}`);
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}

export async function getAnimeDetails(id) {
  const res = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
  const json = await res.json();
  return json.data;
}

// api/kitsu.js
export async function getPopularAnimes() {
  try {
    const res = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=10');
    const json = await res.json();
    return json.data || [];
  } catch {
    return [];
  }
}
