const fetcher = (url) =>
  fetch(url).then((res) => {
    if (res.status === 404) {
      return undefined;
    }
    return res.json();
  });

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const PAGE_LIMIT = 10;

export function fetchPokemon(name?: string, offset?: number): Promise<any> {
  const uri = name
    ? `${API_URL}/${name}`
    : `${API_URL}?limit=${PAGE_LIMIT}&offset=${offset}`;

  try {
    const data = fetcher(uri);

    return data;
  } catch (error) {
    console.log(error);
  }
}
