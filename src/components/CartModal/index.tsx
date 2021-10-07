import { CartPokemonCard } from "../CartPokemonCard";

import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./cart-modal.module.scss";
import { useCart } from "../../hooks/useCart";

interface CartModalProps {
  onClose: () => void;
  isOpen: boolean;
  onFinishedBuyOpen: () => void;
}

export function CartModal({
  onClose,
  isOpen,
  onFinishedBuyOpen,
}: CartModalProps) {
  const { cart, removePokemonInCart, updatePokemonAmount, resetCart } =
    useCart();

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
            <div>
              <div className={styles.pokemonCard}>
                {cart &&
                  cart.map((pokemon) => {
                    return (
                      <div key={pokemon.name} className={styles.cardContainer}>
                        <CartPokemonCard
                          pokemon={pokemon}
                          removePokemonInCart={removePokemonInCart}
                          updatePokemonAmount={updatePokemonAmount}
                        />
                      </div>
                    );
                  })}
              </div>
              <button
                className={styles.button}
                onClick={() => {
                  if (cart.length > 0) {
                    resetCart();
                    onClose();
                    onFinishedBuyOpen();
                  }
                }}
              >
                Confirm Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
