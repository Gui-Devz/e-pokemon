import Image from "next/image";

import { BsTrash } from "react-icons/bs";

import styles from "./cart-pokemon-card.module.scss";

export function CartPokemonCard() {
  return (
    <div className={styles.container}>
      <div className={styles.trashCan}>
        <button>
          <BsTrash />
          <span>remove</span>
        </button>
      </div>
      <div className={styles.pokemonImg}>
        <Image
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
          width={60}
          height={50}
          alt={`pokemon`}
        />
      </div>
      <div className={styles.pokemonContent}>
        <p>Ivysaur</p>
        <div className={styles.pokemonCount}>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
      </div>
      <div className={styles.pokemonInfo}>
        <div className={styles.stats}>
          <div>
            <ul>
              <li>
                <span>hp</span>
              </li>
              <li>
                <span>atk</span>
              </li>
              <li>
                <span>def</span>
              </li>
              <li>
                <span>sp</span>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>30</li>
              <li>30</li>
              <li>30</li>
              <li>30</li>
            </ul>
          </div>
        </div>
        <div className={styles.abilities}>
          <span>Abilities:</span> Overgrow, chlorophyll
        </div>
      </div>
    </div>
  );
}
