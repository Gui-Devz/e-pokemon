import Image from "next/image";

import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import styles from "./pokemon-card.module.scss";
import { useCallback, useEffect, useState } from "react";

type PokemonAttributes = {
  hp: number;
  atk: number;
  def: number;
  sp: number;
};

type PokemonProfile = {
  name: string;
  pokemonImg: string;
  attributes: string[];
  abilities: string[];
};

interface PokemonCardProps {
  pokemon: PokemonProfile;
  favorites: PokemonProfile[];
  toggleFavorites: (pokemonProfile: PokemonProfile) => void;
}

export function PokemonCard({
  pokemon,
  favorites,
  toggleFavorites,
}: PokemonCardProps) {
  const [favorite, setFavorite] = useState<boolean>(true);
  const togglingFavorites = () => {
    toggleFavorites(pokemon);
  };

  const memoizedCheckIfPokemonIsFavorite = useCallback(() => {
    const passed = favorites.some((favorite) => favorite.name === pokemon.name);
    if (passed) {
      setFavorite(false);
    } else {
      setFavorite(true);
    }
  }, [favorites, pokemon]);

  useEffect(() => {
    memoizedCheckIfPokemonIsFavorite();
  }, [memoizedCheckIfPokemonIsFavorite]);

  return (
    <div className={styles.container}>
      {favorite ? (
        <button onClick={() => togglingFavorites()} className={styles.favBtn}>
          <AiOutlineHeart />
        </button>
      ) : (
        <button onClick={() => togglingFavorites()} className={styles.favBtn}>
          <AiFillHeart />
        </button>
      )}

      <div className={styles.pokemonMainInfo}>
        <div className={styles.pokemonImg}>
          <Image
            src={pokemon.pokemonImg}
            width={100}
            height={90}
            alt={`${pokemon.name} pokemon`}
          />
        </div>
        <div className={styles.pokemonAttributes}>
          <p className={styles.name}>{pokemon.name}</p>
          <div className={styles.stats}>
            <div className={styles.labels}>
              <p>Hp:</p>
              <p>Atk:</p>
              <p>Def:</p>
              <p>Sp:</p>
            </div>
            <div className={styles.values}>
              {pokemon.attributes.map((att, index) => {
                return <span key={index}>{att}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pokemonAbilities}>
        <p className={styles.label}>Abilities:</p>
        <p className={styles.abilities}>{pokemon.abilities.join(", ")}</p>
      </div>
      <div className={styles.addCart}>
        <button>
          <span className={styles.buttonContent}>
            <span className={styles.cartSVG}>
              <BsCart4 />
            </span>
            Add to Cart
            <span className={styles.cartCount}>1</span>
          </span>
        </button>
      </div>
    </div>
  );
}
