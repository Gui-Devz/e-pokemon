import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

import { usePokedex } from "../../hooks/usePokedex";

import { useCart } from "../../hooks/useCart";

import logoImg from "../../assets/logo.png";

import { FiMapPin } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import styles from "./header.module.scss";

interface HeaderProps {
  onOpen: () => void;
}

export function Header({ onOpen }: HeaderProps) {
  const { fetchPokedex, setFavoritesInPokedex, fetchPokemonByName } =
    usePokedex();
  const { cart } = useCart();
  const [cartSize, setCartSize] = useState<number>(0);
  const [pokemonName, setPokemonName] = useState<string>("");

  const handlingSearchPokemonByName = (e: FormEvent) => {
    e.preventDefault();

    fetchPokemonByName(pokemonName);
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
        <form onSubmit={handlingSearchPokemonByName}>
          <div className={styles.input}>
            <input
              type="text"
              minLength={5}
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
              <a href="#" onClick={() => fetchPokedex()}>
                Pokedex
              </a>
            </li>
            <li className={styles.cart}>
              <a href="#" onClick={() => onOpen()}>
                My cart <span>{cartSize}</span>
              </a>
            </li>
            <li>
              <a href="#" onClick={() => setFavoritesInPokedex()}>
                Favorites
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.location}>
        <p>
          Location{" "}
          <span>
            <FiMapPin color="#ff5048" />
          </span>{" "}
          :
        </p>
        <p className={styles.name}>SP, Brazil</p>
      </div>
    </div>
  );
}
