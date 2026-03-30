import TerminalWindow from '@/components/TerminalWindow';
import { PROJECTS } from '@/lib/constants';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-header">$ ls projects/</h2>

      <div className={styles.grid}>
        {PROJECTS.map((project) => (
          <TerminalWindow
            key={project.title}
            title={`projects/${project.title.toLowerCase()}`}
          >
            <h3 className={styles.name}>{project.title}</h3>
            <p className={styles.subtitle}>{project.subtitle}</p>
            <div className={styles.separator}>────────────────────────────</div>

            <div className={styles.meta}>
              <p className={styles.metaLine}>
                {'> '}Stack: {project.stack.join(', ')}
              </p>
              <p className={styles.metaLine}>
                {'> '}Platform: {project.platform}
              </p>
              <p className={styles.metaLine}>
                {'> '}Role: {project.role}
              </p>
            </div>

            <p className={styles.description}>{project.description}</p>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              [View Live →]
            </a>
          </TerminalWindow>
        ))}
      </div>
    </section>
  );
}
