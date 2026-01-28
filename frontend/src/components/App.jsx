import { useState, useEffect } from 'react';
import { Header } from './Header';
import { SkillSelector } from './SkillSelector';
import { BuyablesTable } from './BuyablesTable';
import { useBuyables } from '../hooks/useBuyables';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';

function App() {
  const [selectedSkill, setSelectedSkill] = useState(() => {
    // Load from localStorage or default to herblore
    return localStorage.getItem('selectedSkill') || 'herblore';
  });

  const { data, loading, error, refetch } = useBuyables(selectedSkill);

  // Save selected skill to localStorage
  useEffect(() => {
    localStorage.setItem('selectedSkill', selectedSkill);
  }, [selectedSkill]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Controls Section */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <SkillSelector
            selectedSkill={selectedSkill}
            onSkillChange={setSelectedSkill}
          />

          {data && (
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-dark-muted">
                Last updated: {new Date(data.lastUpdated).toLocaleTimeString()}
              </div>
              <button
                onClick={refetch}
                disabled={loading}
                className="p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-dark-surface disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Refresh data"
                title="Refresh data"
              >
                <RefreshCw
                  className={`w-5 h-5 text-gray-600 dark:text-dark-muted ${
                    loading ? 'animate-spin' : ''
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-dark-muted">
              Loading buyables data...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">
                  Error Loading Data
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                <button
                  onClick={refetch}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && data && data.items && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-dark-text capitalize">
                {data.skill} Buyables
              </h2>
              <p className="text-sm text-gray-600 dark:text-dark-muted mt-1">
                {data.items.length} items • Sorted by best GP/XP value
              </p>
            </div>

            <BuyablesTable data={data.items} />

            {/* Info Section */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Understanding GP/XP
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>
                  <strong className="text-green-600 dark:text-green-400">
                    Negative GP/XP
                  </strong>{' '}
                  = You make profit while training!
                </li>
                <li>
                  <strong className="text-red-600 dark:text-red-400">
                    Positive GP/XP
                  </strong>{' '}
                  = It costs GP to train
                </li>
                <li>Lower values = better efficiency (less cost per XP)</li>
                <li>
                  Prices update every 5 minutes from OSRS Wiki real-time data
                </li>
              </ul>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && data && data.items && data.items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 dark:text-dark-muted">
              No buyables data available for this skill.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
