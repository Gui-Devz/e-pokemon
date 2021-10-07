import React from "react";
import { usePokedex } from "../../hooks/usePokedex";
import { PokemonCard } from "../PokemonCard";
import styles from "./pokedex.module.scss";

interface PokedexProps {
  showButtonLoadMore: boolean;
}

export function Pokedex({ showButtonLoadMore }: PokedexProps) {
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
      {showButtonLoadMore && (
        <div className={styles.btnLoadMore}>
          <button onClick={() => fetchPokedex("", pokedex.length)}>
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
