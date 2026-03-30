import styles from './TerminalWindow.module.css';

interface TerminalWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function TerminalWindow({ title, children, className }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${styles.wrapper} ${className ?? ''}`}>
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span className="terminal-dot terminal-dot--red" />
          <span className="terminal-dot terminal-dot--yellow" />
          <span className="terminal-dot terminal-dot--green" />
        </div>
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
