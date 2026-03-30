import TerminalWindow from '@/components/TerminalWindow';
import { getMediumPosts } from '@/lib/medium';
import styles from './Blog.module.css';

function toISODate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  } catch {
    return dateStr;
  }
}

export default async function Blog() {
  const posts = await getMediumPosts();

  return (
    <section id="blog" className="section">
      <h2 className="section-header">$ ls -lt posts/</h2>

      <TerminalWindow title="blog/">
        {posts.length > 0 ? (
          <div className={styles.list}>
            {posts.map((post) => (
              <div key={post.link} className={styles.row}>
                <span className={styles.date}>{toISODate(post.date)}</span>
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.title}
                >
                  {post.title.length > 50
                    ? post.title.slice(0, 50).trimEnd() + '...'
                    : post.title}
                </a>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p className={styles.command}>$ ls posts/</p>
            <p className={styles.message}>
              {'> '}No articles yet. Check back soon.
            </p>
            <p className={styles.message}>
              {'> '}Follow{' '}
              <a
                href="https://x.com/aditya_sankhla_"
                target="_blank"
                rel="noopener noreferrer"
              >
                @aditya_sankhla_
              </a>{' '}
              on X for updates.
            </p>
          </div>
        )}
      </TerminalWindow>
    </section>
  );
}
