'use client';

import TerminalWindow from '@/components/TerminalWindow';
import { SOCIAL } from '@/lib/constants';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <TerminalWindow title="contact.sh">
        <p className={styles.command}>$ ./reach-out.sh</p>

        <form
          action="https://formspree.io/f/xformid"
          method="POST"
          className={styles.form}
        >
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="your name"
              className={styles.input}
              autoComplete="name"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={styles.input}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message" className={styles.label}>
              message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="what's on your mind?"
              rows={5}
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.submit}>
            $ send_message
          </button>
        </form>

        <div className={styles.separator}>
          ──────────────────────────────
        </div>

        <p className={styles.findMe}>Or find me at:</p>

        <div className={styles.socials}>
          <p className={styles.socialLine}>
            {'> '}{' '}
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
          <p className={styles.socialLine}>
            {'> '}{' '}
            <a
              href={SOCIAL.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              X (Twitter)
            </a>
          </p>
          <p className={styles.socialLine}>
            {'> '}{' '}
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </TerminalWindow>
    </section>
  );
}
