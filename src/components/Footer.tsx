import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.separator}>
        ════════════════════════════════════════
      </div>
      <p className={styles.built}>
        Built with Next.js + deployed on Vercel
      </p>
      <p className={styles.copyright}>
        &copy; {year} Aditya Sankhla
        <span className="cursor" />
      </p>
    </footer>
  );
}
