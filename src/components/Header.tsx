import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>✨</span>
          <div>
            <h1 className={styles.title}>SR Smart Finds</h1>
            <p className={styles.tagline}>Handpicked products · Best prices</p>
          </div>
        </div>
        <p className={styles.disclosure}>
          ⚡ Affiliate links · We may earn a commission at no extra cost to you
        </p>
      </div>
    </header>
  );
}
