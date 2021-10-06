import Image from "next/image";

import { usePokedex } from "../../hooks/usePokedex";

import logoImg from "../../assets/logo.png";

import { FiMapPin } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";

import styles from "./header.module.scss";
import { FormEvent, useState } from "react";

interface HeaderProps {
  onOpen: () => void;
}

export function Header({ onOpen }: HeaderProps) {
  const { fetchPokedex, setFavoritesInPokedex, fetchPokemonByName } =
    usePokedex();
  const [pokemonName, setPokemonName] = useState<string>("");

  const handlingSearchPokemonByName = (e: FormEvent) => {
    e.preventDefault();
    if (pokemonName.length > 4) {
      fetchPokemonByName(pokemonName);
    }
  };
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
              placeholder="Search for your pokemón"
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
                My cart <span>1</span>
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
