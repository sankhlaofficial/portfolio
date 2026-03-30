'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { executeCommand } from '@/lib/commands';
import styles from './Terminal.module.css';

interface TerminalLine {
  type: 'input' | 'output';
  content: string;
}

interface TerminalProps {
  onReady?: () => void;
}

const INTRO_SEQUENCE = [
  { cmd: 'whoami', delay: 800 },
  { cmd: 'cat role.txt', delay: 1200 },
  { cmd: 'ls skills/', delay: 1000 },
];

export default function Terminal({ onReady }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentSeqIndex, setCurrentSeqIndex] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentCharIndex]);

  // Intro animation sequence
  useEffect(() => {
    if (prefersReducedMotion) {
      // Show all intro at once
      const allLines: TerminalLine[] = [];
      for (const seq of INTRO_SEQUENCE) {
        allLines.push({ type: 'input', content: seq.cmd });
        const result = executeCommand(seq.cmd);
        if (result.type === 'output') {
          result.lines.forEach((line) =>
            allLines.push({ type: 'output', content: line })
          );
        }
      }
      allLines.push({
        type: 'output',
        content: '',
      });
      allLines.push({
        type: 'output',
        content: "Type 'help' for available commands",
      });
      setLines(allLines);
      setIsAnimating(false);
      setShowInput(true);
      onReady?.();
      return;
    }

    if (!isAnimating || currentSeqIndex >= INTRO_SEQUENCE.length) {
      if (currentSeqIndex >= INTRO_SEQUENCE.length && isAnimating) {
        // Finished all sequences
        setLines((prev) => [
          ...prev,
          { type: 'output', content: '' },
          { type: 'output', content: "Type 'help' for available commands" },
        ]);
        setIsAnimating(false);
        setShowInput(true);
        onReady?.();
      }
      return;
    }

    const seq = INTRO_SEQUENCE[currentSeqIndex];

    if (currentCharIndex === 0) {
      // Start typing a new command
      setLines((prev) => [...prev, { type: 'input', content: '' }]);
    }

    if (currentCharIndex < seq.cmd.length) {
      const timer = setTimeout(() => {
        setLines((prev) => {
          const newLines = [...prev];
          const lastLine = newLines[newLines.length - 1];
          if (lastLine && lastLine.type === 'input') {
            lastLine.content = seq.cmd.slice(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      // Command typed, show output
      const timer = setTimeout(() => {
        const result = executeCommand(seq.cmd);
        if (result.type === 'output') {
          setLines((prev) => [
            ...prev,
            ...result.lines.map((line) => ({
              type: 'output' as const,
              content: line,
            })),
          ]);
        }
        setCurrentCharIndex(0);
        setCurrentSeqIndex((prev) => prev + 1);
      }, seq.delay);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, currentSeqIndex, currentCharIndex, prefersReducedMotion, onReady]);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Add input line
    setLines((prev) => [...prev, { type: 'input', content: trimmed }]);

    const result = executeCommand(trimmed);

    if (result.type === 'clear') {
      setLines([]);
    } else if (result.type === 'scroll') {
      const target = result.target.replace('#', '');
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setLines((prev) => [
        ...prev,
        { type: 'output', content: `Navigating to ${target}...` },
      ]);
    } else if (result.type === 'output') {
      setLines((prev) => [
        ...prev,
        ...result.lines.map((line) => ({
          type: 'output' as const,
          content: line,
        })),
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.titlebar}>
        <div className={styles.dots}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <span className={styles.titleText}>aditya@portfolio: ~</span>
        <div className={styles.dots} style={{ visibility: 'hidden' }}>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
      </div>
      <div
        className={styles.body}
        ref={terminalRef}
        onClick={handleTerminalClick}
        role="textbox"
        tabIndex={0}
        aria-label="Interactive terminal"
      >
        <div aria-live="polite">
          {lines.map((line, i) => (
            <div key={i} className={styles.line}>
              {line.type === 'input' ? (
                <span>
                  <span className={styles.prompt}>$</span> {line.content}
                  {isAnimating &&
                    i === lines.length - 1 &&
                    currentCharIndex < (INTRO_SEQUENCE[currentSeqIndex]?.cmd.length ?? 0) && (
                      <span className={styles.cursor} />
                    )}
                </span>
              ) : (
                <span className={styles.output}>{line.content}</span>
              )}
            </div>
          ))}
        </div>
        {showInput && (
          <div className={styles.inputLine}>
            <span className={styles.prompt}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
            <span className={styles.cursor} />
          </div>
        )}
      </div>
    </div>
  );
}
