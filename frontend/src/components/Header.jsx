import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
            Buyables
          </h1>
          <span className="text-sm text-gray-500 dark:text-dark-muted">
            OSRS Price per XP Tracker
          </span>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
