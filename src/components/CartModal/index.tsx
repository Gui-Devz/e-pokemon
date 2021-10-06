import { CartPokemonCard } from "../CartPokemonCard";

import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./cart-modal.module.scss";

interface CartModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function CartModal({ onClose, isOpen }: CartModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.cartContent}>
            <div className={styles.closeBtn}>
              <button onClick={() => onClose()}>
                <AiFillCloseCircle />
              </button>
            </div>
            <div className={styles.pokemonCard}>
              <CartPokemonCard />
            </div>

            <button className={styles.button}>Confirm Buy</button>
          </div>
        </div>
      )}
    </>
  );
}
