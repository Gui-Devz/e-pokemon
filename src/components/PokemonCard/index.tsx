import Image from "next/image";

import { BsCart4 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

import styles from "./pokemon-card.module.scss";

export function PokemonCard() {
  const pokemon = {
    name: "Ivysaur",
  };
  return (
    <div className={styles.container}>
      {true ? (
        <div className={styles.favBtn}>
          <AiOutlineHeart />
        </div>
      ) : (
        <div className={styles.favBtn}>
          <AiFillHeart />
        </div>
      )}

      <div className={styles.pokemonMainInfo}>
        <div className={styles.pokemonImg}>
          <Image
            src={
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
            }
            width={100}
            height={90}
            alt={`${pokemon.name} pokemon`}
          />
        </div>
        <div className={styles.pokemonAttributes}>
          <p className={styles.name}>Ivysaur</p>
          <div className={styles.stats}>
            <div className={styles.labels}>
              <p>Hp:</p>
              <p>Atk:</p>
              <p>Def:</p>
              <p>Sp:</p>
            </div>
            <div className={styles.values}>
              <span>60</span>
              <span>60</span>
              <span>60</span>
              <span>60</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pokemonAbilities}>
        <p className={styles.label}>Abilities:</p>
        <p className={styles.abilities}>overgrow, chlorophyll, chlorophyll</p>
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
