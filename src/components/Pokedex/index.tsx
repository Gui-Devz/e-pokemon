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
  const { pokedex, favorites, toggleFavorites, fetchPokedex } = usePokedex();

  return (
    <div className={styles.container}>
      {pokedex.length === 0 && (
        <div>
          <h2>Pokemon not found</h2>
        </div>
      )}

      <div className={styles.pokedex}>
        {pokedex.length > 0 &&
          pokedex.map((pokemon, index) => {
            return (
              <React.Fragment key={index}>
                <PokemonCard
                  pokemon={pokemon}
                  favorites={favorites}
                  toggleFavorites={toggleFavorites}
                />
              </React.Fragment>
            );
          })}
      </div>
      {pokedex.length > 1 && (
        <div className={styles.btnLoadMore}>
          <button onClick={() => fetchPokedex("", pokedex.length)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
