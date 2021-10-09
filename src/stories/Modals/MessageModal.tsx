import styles from "./message-modal.module.scss";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText: string;
}

export function MessageModal({
  isOpen,
  onClose,
  message = "Congrats! you just finished your purchase.",
  buttonText = "keep buying",
}: MessageModalProps) {
  return (
    <>
      {isOpen && (
        <div className={styles.container}>
          <div className={styles.modalContent}>
            <h2>{message}</h2>
            <button onClick={() => onClose()}>{buttonText}</button>
          </div>
        </div>
      )}
    </>
  );
}
