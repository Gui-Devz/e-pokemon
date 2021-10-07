import styles from "./finished-buy-modal.module.scss";

interface FinishedBuyModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export function FinishedBuyModal({ onClose, isOpen }: FinishedBuyModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modalContent}>
            <h2>Congrats! you just finished your purchase.</h2>
            <button onClick={() => onClose()}>keep buying</button>
          </div>
        </div>
      )}
    </>
  );
}
