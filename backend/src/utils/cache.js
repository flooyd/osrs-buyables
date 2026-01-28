import NodeCache from 'node-cache';

const CACHE_TTL = parseInt(process.env.CACHE_TTL_SECONDS) || 300; // 5 minutes default

// Initialize cache with TTL
const cache = new NodeCache({
  stdTTL: CACHE_TTL,
  checkperiod: 60, // Check for expired keys every 60 seconds
  useClones: false // Don't clone data for better performance
});

// Log cache events
cache.on('set', (key, value) => {
  console.log(`[Cache] Set: ${key}`);
});

cache.on('expired', (key, value) => {
  console.log(`[Cache] Expired: ${key}`);
});

export default cache;
