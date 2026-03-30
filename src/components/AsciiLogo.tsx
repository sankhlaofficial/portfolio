import styles from './AsciiLogo.module.css';

const ASCII = `    _    ____
   / \\  / ___|
  / _ \\ \\___ \\
 / ___ \\ ___) |
/_/   \\_\\____/ `;

export default function AsciiLogo() {
  return (
    <div className={styles.container}>
      <pre className={styles.art} aria-label="AS initials in ASCII art">
        {ASCII}
      </pre>
    </div>
  );
}
