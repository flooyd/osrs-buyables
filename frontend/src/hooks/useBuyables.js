import { useState, useEffect } from 'react';
import { getBuyables } from '../services/api';

const REFRESH_INTERVAL = parseInt(import.meta.env.VITE_REFRESH_INTERVAL_MS) || 300000; // 5 minutes

/**
 * Hook for fetching and managing buyables data
 * @param {string} skill - Skill name to fetch data for
 * @returns {Object} { data, loading, error, refetch }
 */
export function useBuyables(skill) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!skill) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getBuyables(skill);
      setData(result);
    } catch (err) {
      console.error('[useBuyables] Error fetching data:', err);
      setError(err.response?.data?.error?.message || err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up auto-refresh
    const interval = setInterval(fetchData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [skill]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}
