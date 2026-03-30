'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './TypingEffect.module.css';

interface TypingEffectProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
}

export default function TypingEffect({ text, speed = 50, onComplete }: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);
  const prefersReducedMotion = useRef(false);
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion.current) {
      setDisplayed(text);
      setDone(true);
      onCompleteRef.current?.();
      return;
    }

    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
        onCompleteRef.current?.();
      } else {
        setDisplayed(text.slice(0, indexRef.current));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={styles.container}>
      <span className={styles.text}>{displayed}</span>
      {!done && <span className={styles.cursor} aria-hidden="true" />}
    </span>
  );
}
