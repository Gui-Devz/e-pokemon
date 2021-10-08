import { ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import styles from "./sidedCart-modal.module.scss";

type Product = {
  id: number;
  component: ReactNode;
};

interface SidedCartModalProps {
  onClose: () => void;
  isOpen: boolean;
  onFinishedBuying: () => void;
  productCards: Product[];
}

export function SidedCartModal({
  onClose,
  productCards,
  isOpen,
  onFinishedBuying,
}: SidedCartModalProps) {
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
              <div className={styles.card}>
                {productCards &&
                  productCards.map((product) => {
                    return (
                      <div key={product.id} className={styles.cardContainer}>
                        {product.component}
                      </div>
                    );
                  })}
              </div>
              <button
                className={styles.button}
                onClick={() => onFinishedBuying}
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
