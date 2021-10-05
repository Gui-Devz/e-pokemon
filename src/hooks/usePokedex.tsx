import {
  createContext,
  ReactNode,
  useCallback,
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
  memoizedFetchPokedex: (offset?: number) => Promise<void>;
  toggleFavorites: (pokemonProfile: PokemonProfile) => void;
  /* fetchNextPokemonGroup: ()=> void;
  addFavoritePokemon: ()=> void;
  removeFavoritePokemon: ()=> void;
  getFavoritePokemon: ()=> void; */
}

const PokedexContext = createContext<PokedexContextData>(
  {} as PokedexContextData
);

export function PokedexProvider({ children }: PokedexProviderProps) {
  const [pokedex, setPokedex] = useState<PokemonProfile[]>([]);
  const [favorites, setFavorites] = useState<PokemonProfile[]>([]);

  const memoizedFetchPokedex = useCallback(
    async (offset?: number) => {
      //fetching the names of the pokemons in groups of 10.
      const data = await fetchPokemon("", offset);
      const pokemonNames = data.results;

      //getting the pokemon profile for each pokemon name from pokemonNames
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

      //avoid duplicating pokedex.
      if (pokedex[0]?.name === pokemonProfiles[0].name) {
        return;
      }

      setPokedex([...pokedex, ...pokemonProfiles]);
    },
    [pokedex]
  );

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
      return;
    }

    setFavorites([...favorites, pokemonProfile]);
  };

  useEffect(() => {
    memoizedFetchPokedex();
  }, [memoizedFetchPokedex]);

  return (
    <PokedexContext.Provider
      value={{ pokedex, toggleFavorites, memoizedFetchPokedex }}
    >
      {children}
    </PokedexContext.Provider>
  );
}

export function usePokedex(): PokedexContextData {
  const context = useContext(PokedexContext);

  return context;
}
