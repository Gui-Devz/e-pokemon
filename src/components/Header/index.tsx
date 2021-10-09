import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Location } from "../Location";

import { usePokedex } from "../../hooks/usePokedex";
import { useCart } from "../../hooks/useCart";

import { FiSearch } from "react-icons/fi";

import logoImg from "../../assets/logo.png";

import styles from "./header.module.scss";

interface HeaderProps {
  onOpen: () => void;
  handlingShowingButtonLoadMore: (value: boolean) => void;
  setNotFoundPokemonName: Dispatch<SetStateAction<string>>;
}

export function Header({
  onOpen,
  handlingShowingButtonLoadMore,
  setNotFoundPokemonName,
}: HeaderProps) {
  const {
    fetchPokedex,
    setFavoritesInPokedex,
    fetchPokemonByName,
  } = usePokedex();
  const { cart } = useCart();
  const [cartSize, setCartSize] = useState<number>(0);
  const [pokemonName, setPokemonName] = useState<string>("");

  const handlingSearchPokemonByName = (event) => {
    event.preventDefault();
    //resetting the value of the input
    event.target.lastChild.firstChild.value = "";

    if (pokemonName.length > 0) {
      fetchPokemonByName(pokemonName.toLowerCase());
      handlingShowingButtonLoadMore(false);
      setNotFoundPokemonName(pokemonName);
    }
  };

  //guarantees the value displayed is same for the server(SSR).
  useEffect(() => {
    setCartSize(cart.length);
  }, [cart]);
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logo}>
        <Image src={logoImg} alt="IZA logo" />
      </div>

      <div className={styles.searchBar}>
        <form onSubmit={(e) => handlingSearchPokemonByName(e)}>
          <div className={styles.input}>
            <input
              type="text"
              minLength={3}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="Search for your pokémon"
            />
            <button type="submit">
              <FiSearch color="#adadad" size="1.5em" />
            </button>
          </div>
        </form>
      </div>

      <div className={styles.cartFavs}>
        <nav>
          <ul>
            <li className={styles.cart}>
              <a
                href="#"
                onClick={() => {
                  fetchPokedex();
                  handlingShowingButtonLoadMore(true);
                }}
              >
                Pokedex
              </a>
            </li>
            <li className={styles.cart}>
              <a href="#" onClick={() => onOpen()}>
                My cart {cartSize > 0 && <span>{cartSize}</span>}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  setFavoritesInPokedex();
                  handlingShowingButtonLoadMore(false);
                }}
              >
                Favorites
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.location}>
        <Location />
      </div>
    </div>
  );
}
