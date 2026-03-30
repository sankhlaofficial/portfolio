'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY < 200);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      className={`${styles.container} ${!visible ? styles.hidden : ''}`}
      aria-hidden="true"
    >
      <span className={styles.label}>scroll down</span>
      <span className={styles.arrow}>&#8595;</span>
    </div>
  );
}
