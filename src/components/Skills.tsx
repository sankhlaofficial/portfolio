import { SKILLS } from '@/lib/constants';
import styles from './Skills.module.css';

const BAR_LENGTH = 14;

function getLevel(pct: number): string {
  if (pct >= 90) return 'Expert';
  if (pct >= 70) return 'Advanced';
  return 'Intermediate';
}

function renderBar(pct: number): string {
  const filled = Math.round((pct / 100) * BAR_LENGTH);
  const empty = BAR_LENGTH - filled;
  return '\u2588'.repeat(filled) + '\u2591'.repeat(empty);
}

function skillToFilename(skill: string): string {
  return skill.toLowerCase().replace(/[^a-z0-9]/g, '') + '.ts';
}

export default function Skills() {
  const categories = Object.entries(SKILLS);

  return (
    <section id="skills" className="section">
      <h2 className="section-header">$ ls -la skills/</h2>

      <div className={styles.listing}>
        {categories.map(([category, skills]) => (
          <div key={category} className={styles.category}>
            <p className={styles.dirHeader}>
              drwxr-xr-x  {category.toLowerCase()}/
            </p>
            <div className={styles.files}>
              {Object.entries(skills).map(([skill, pct], idx, arr) => {
                const prefix = idx < arr.length - 1 ? '\u251C\u2500\u2500' : '\u2514\u2500\u2500';
                return (
                  <div key={skill} className={styles.fileRow}>
                    <span className={styles.tree}>{prefix}</span>
                    <span className={styles.filename}>
                      {skillToFilename(skill)}
                    </span>
                    <span className={styles.bar}>{renderBar(pct)}</span>
                    <span className={styles.level}>{getLevel(pct)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
