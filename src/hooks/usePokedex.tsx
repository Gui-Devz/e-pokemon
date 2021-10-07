import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchPokemon } from "../lib/fetchPokemon";

type PokemonProfile = {
  name: string;
  pokemonImg: string;
  attributes: string[];
  abilities: string[];
};

interface PokedexProviderProps {
  children: ReactNode;
}

interface PokedexContextData {
  pokedex: PokemonProfile[];
  favorites: PokemonProfile[];
  fetchPokedex: (name?: string, offset?: number) => Promise<void>;
  fetchPokemonByName: (name?: string) => Promise<void>;
  toggleFavorites: (pokemonProfile: PokemonProfile) => void;
  setFavoritesInPokedex: () => void;
}

const PokedexContext = createContext<PokedexContextData>(
  {} as PokedexContextData
);

export function PokedexProvider({ children }: PokedexProviderProps) {
  const [pokedex, setPokedex] = useState<PokemonProfile[]>([]);
  const [favorites, setFavorites] = useState<PokemonProfile[]>(() => {
    const storagedCart =
      typeof window !== "undefined"
        ? localStorage.getItem("@IZA:favorites")
        : null;

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const fetchPokedex = async (name?: string, offset?: number) => {
    //fetching the names of the pokemons in groups of 10.
    const data = await fetchPokemon(name, offset);
    const pokemonNames = data.results;
    //getting the pokemon profile for each pokemon name from the pokemon API
    const pokemonProfilesPromises = pokemonNames.map(async (pokemon) => {
      const data = await fetchPokemon(pokemon.name);

      //getting only the attributes that I want.
      const rawAttributes = data?.stats.map((stat) => {
        switch (stat.stat.name) {
          case "hp":
            return stat.base_stat;

          case "attack":
            return stat.base_stat;

          case "defense":
            return stat.base_stat;

          case "speed":
            return stat.base_stat;

          default:
            break;
        }
      });
      //removing the undefined from the array.
      const attributes = rawAttributes.filter((att) => att !== undefined);

      const pokemonProfile = {
        name: pokemon.name,
        pokemonImg: data?.sprites.other.dream_world.front_default,
        attributes: attributes,
        abilities: data?.abilities.map((val) => val.ability.name),
      };

      return pokemonProfile;
    });

    const pokemonProfiles: PokemonProfile[] = await Promise.all(
      pokemonProfilesPromises
    );

    /* this code block guarantees that there will not be duplicated
    pokemon cards when navigating from favorites to pokedex.*/
    if (!offset) {
      setPokedex([]);
      setPokedex(pokemonProfiles);
      return;
    }
    setPokedex([...pokedex, ...pokemonProfiles]);
  };

  const fetchPokemonByName = async (name: string) => {
    const pokemon = await fetchPokemon(name, null);

    //if there's no result with the name the user put, the pokedex
    //will be set blank in order to show a message in the Pokedex component.
    if (!pokemon) {
      setPokedex([]);
      return;
    }
    const rawAttributes = pokemon.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          return stat.base_stat;

        case "attack":
          return stat.base_stat;

        case "defense":
          return stat.base_stat;

        case "speed":
          return stat.base_stat;

        default:
          break;
      }
    });
    //removing the undefined from the array.
    const attributes = rawAttributes.filter((att) => att !== undefined);

    const pokemonProfile = {
      name: pokemon.name,
      pokemonImg: pokemon.sprites.other.dream_world.front_default,
      attributes: attributes,
      abilities: pokemon.abilities.map((val) => val.ability.name),
    };

    setPokedex([pokemonProfile]);
  };

  const toggleFavorites = (pokemonProfile) => {
    //checking if pokemon is already in favorites.
    const checkFavorites = favorites.some((pokemon) => {
      return pokemon.name === pokemonProfile.name;
    });

    if (checkFavorites) {
      const filtered = favorites.filter(
        (pokemon) => pokemon.name !== pokemonProfile.name
      );

      setFavorites(filtered);
      localStorage.setItem("@IZA:favorites", JSON.stringify(filtered));
      return;
    }

    setFavorites([...favorites, pokemonProfile]);
    localStorage.setItem(
      "@IZA:favorites",
      JSON.stringify([...favorites, pokemonProfile])
    );
  };

  const setFavoritesInPokedex = () => {
    if (favorites.length > 0) {
      setPokedex(favorites);
    }
    return;
  };

  /* calling the fetchPokedex inside this effect guarantees that when the app 
  loads for the first time the pokedex will be filled. */
  useEffect(() => {
    fetchPokedex();
  }, []);

  return (
    <PokedexContext.Provider
      value={{
        pokedex,
        favorites,
        toggleFavorites,
        fetchPokedex,
        fetchPokemonByName,
        setFavoritesInPokedex,
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
}

export function usePokedex(): PokedexContextData {
  const context = useContext(PokedexContext);

  return context;
}
