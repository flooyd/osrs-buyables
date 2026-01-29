import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
            Buyables
          </h1>
          <span className="text-sm text-light-muted dark:text-dark-muted">
            OSRS Price per XP Tracker
          </span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
