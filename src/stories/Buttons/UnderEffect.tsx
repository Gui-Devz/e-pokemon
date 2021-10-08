import styles from "./undereffect.module.scss";

interface UnderEffectProps {
  label: string;
  onClick?: () => void;
  count?: number;
  href: string;
}

export function UnderEffect({
  label = "button",
  onClick,
  count,
  href = "",
}: UnderEffectProps) {
  return (
    <div className={styles.container}>
      <a href={href} onClick={() => onClick}>
        {label} {count > 0 && <span>{count}</span>}
      </a>
    </div>
  );
}
