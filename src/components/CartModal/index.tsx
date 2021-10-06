import { CartPokemonCard } from "../CartPokemonCard";

import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./cart-modal.module.scss";

export function CartModal() {
  return (
    <div className={styles.container}>
      <div className={styles.cartContent}>
        <div className={styles.closeBtn}>
          <button>
            <AiFillCloseCircle />
          </button>
        </div>
        <div className={styles.pokemonCard}>
          <CartPokemonCard />
        </div>

        <button className={styles.button}>Confirm Buy</button>
      </div>
    </div>
  );
}
