'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
  { label: '[about]', id: 'about' },
  { label: '[projects]', id: 'projects' },
  { label: '[experience]', id: 'experience' },
  { label: '[skills]', id: 'skills' },
  { label: '[blog]', id: 'blog' },
  { label: '[contact]', id: 'contact' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);

    const sections = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return { id: item.id, top: Infinity };
      const rect = el.getBoundingClientRect();
      return { id: item.id, top: Math.abs(rect.top - 80) };
    });

    const closest = sections.reduce((prev, curr) =>
      curr.top < prev.top ? curr : prev
    );

    if (closest.top < window.innerHeight / 2) {
      setActiveSection(closest.id);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <button
          className={styles.logo}
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll to top"
        >
          aditya_sankhla<span className={styles.dollar}>$</span>
        </button>

        <ul className={styles.links}>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                className={`${styles.link} ${
                  activeSection === item.id ? styles.linkActive : ''
                }`}
                onClick={() => scrollTo(item.id)}
                type="button"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '[x]' : '[=]'}
        </button>
      </div>

      <ul
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ''
        }`}
      >
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.mobileLink} ${
                activeSection === item.id ? styles.mobileLinkActive : ''
              }`}
              onClick={() => scrollTo(item.id)}
              type="button"
            >
              {'> '}{item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
