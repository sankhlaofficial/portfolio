'use client';

import Terminal from './Terminal';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.container}>
        <Terminal />
        <div className={styles.scrollHint}>
          <span className={styles.scrollText}>scroll down</span>
          <span className={styles.arrow}>↓</span>
        </div>
      </div>
    </section>
  );
}
