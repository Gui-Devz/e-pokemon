import { BsCart4 } from "react-icons/bs";
import styles from "./common.module.scss";

interface CommonProps {
  onClick: () => void;
  amount?: number;
}

export function AddToCartButton({ onClick, amount }: CommonProps) {
  return (
    <button onClick={() => onClick}>
      <span className={styles.buttonContent}>
        <span className={styles.cartSVG}>
          <BsCart4 />
        </span>
        Add to Cart
        {amount > 0 && <span className={styles.cartCount}>{amount}</span>}
      </span>
    </button>
  );
}
