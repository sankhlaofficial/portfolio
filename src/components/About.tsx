import TerminalWindow from '@/components/TerminalWindow';
import AsciiLogo from '@/components/AsciiLogo';
import styles from './About.module.css';

const BIO_LINES = [
  'Self-taught developer from Jaipur, India',
  'CTO building wellness tech at WellM',
  'AI-powered builder — ship 5x faster',
  'Father, meditator, lifelong learner',
];

export default function About() {
  return (
    <section id="about" className="section">
      <TerminalWindow title="about.md">
        <AsciiLogo />

        <div className={styles.bio}>
          {BIO_LINES.map((line) => (
            <p key={line} className={styles.bioLine}>
              {'> '}{line}
            </p>
          ))}
        </div>

        <p className={styles.paragraph}>
          I got into IIT, dropped out, worked customer support for 3 years,
          taught myself to code with AI, and now I&apos;m CTO of a wellness
          startup. I build things that matter.
        </p>

        <p className={styles.currently}>
          Currently building in public as{' '}
          <a
            href="https://x.com/aditya_sankhla_"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Vibe Coder
          </a>{' '}
          on X.
        </p>
      </TerminalWindow>
    </section>
  );
}
