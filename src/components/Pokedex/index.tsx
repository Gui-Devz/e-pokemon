import React, { useCallback, useEffect, useState } from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { fetchPokemon } from "../../lib/fetchPokemon";
import { PokemonCard } from "../PokemonCard";
import styles from "./pokedex.module.scss";

type Pokemons = {
  name: string;
  url: string;
};

type PokemonAttributes = {
  hp: number;
  atk: number;
  def: number;
  sp: number;
};

type PokemonProfile = {
  name: string;
  pokemonImg: string;
  attributes: PokemonAttributes[];
  abilities: string[];
};

interface PokedexProps {
  pokemonList: Pokemons[];
}

export function Pokedex() {
  const { pokedex, toggleFavorites, memoizedFetchPokedex } = usePokedex();

  return (
    <div className={styles.container}>
      <div className={styles.pokedex}>
        {pokedex.length > 0 &&
          pokedex.map((pokemon, index) => {
            return (
              <React.Fragment key={index}>
                <PokemonCard
                  pokemon={pokemon}
                  toggleFavorites={toggleFavorites}
                />
              </React.Fragment>
            );
          })}
      </div>
      <div className={styles.btnLoadMore}>
        <button onClick={() => memoizedFetchPokedex(pokedex.length)}>
          Load more
        </button>
      </div>
    </div>
  );
}
