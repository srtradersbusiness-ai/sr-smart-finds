import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.disclaimer}>
          This site contains affiliate links. When you click a link and make a
          purchase, we may earn a small commission at no extra cost to you.
          Prices shown are approximate and may vary.
        </p>
        <p className={styles.copy}>© {new Date().getFullYear()} SR Smart Finds</p>
      </div>
    </footer>
  );
}
