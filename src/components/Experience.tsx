import { EXPERIENCE } from '@/lib/constants';
import styles from './Experience.module.css';

function hashFromTitle(title: string, org: string): string {
  const raw = `${title}${org}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    hash = ((hash << 5) - hash + raw.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(16).slice(0, 7).padStart(7, 'a');
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2 className="section-header">$ git log --oneline career</h2>

      <div className={styles.timeline}>
        {EXPERIENCE.map((entry) => (
          <div key={entry.title + entry.org} className={styles.entry}>
            <div className={styles.dot} />
            <div className={styles.content}>
              <div className={styles.header}>
                <span className={styles.hash}>
                  {hashFromTitle(entry.title, entry.org)}
                </span>
                <span className={styles.period}>{entry.period}</span>
              </div>
              <h3 className={styles.role}>
                {entry.title} @ {entry.org}
              </h3>
              <p className={styles.description}>{entry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
