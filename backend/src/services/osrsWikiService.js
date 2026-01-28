import axios from 'axios';
import cache from '../utils/cache.js';

const WIKI_API_BASE_URL = process.env.WIKI_API_BASE_URL || 'https://prices.runescape.wiki/api/v1/osrs';
const USER_AGENT = process.env.USER_AGENT || 'Buyables/1.0';

/**
 * Fetches the latest prices from OSRS Wiki API
 * @returns {Promise<Object>} Object with itemId as key and {high, low, highTime, lowTime} as value
 */
export async function getLatestPrices() {
  const cacheKey = 'osrs_prices_latest';

  // Check cache first
  const cachedPrices = cache.get(cacheKey);
  if (cachedPrices) {
    console.log('[OSRS Wiki] Returning cached prices');
    return cachedPrices;
  }

  console.log('[OSRS Wiki] Fetching fresh prices from API');

  try {
    const response = await axios.get(`${WIKI_API_BASE_URL}/latest`, {
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 10000 // 10 second timeout
    });

    const prices = response.data.data;

    // Cache the prices
    cache.set(cacheKey, prices);

    console.log(`[OSRS Wiki] Fetched ${Object.keys(prices).length} item prices`);

    return prices;
  } catch (error) {
    console.error('[OSRS Wiki] Error fetching prices:', error.message);

    // If we have stale cache data, return it as fallback
    const staleCache = cache.get(cacheKey);
    if (staleCache) {
      console.log('[OSRS Wiki] Returning stale cache as fallback');
      return staleCache;
    }

    throw new Error(`Failed to fetch OSRS prices: ${error.message}`);
  }
}

/**
 * Fetches prices for specific item IDs
 * @param {Array<number>} itemIds - Array of item IDs to fetch
 * @returns {Promise<Object>} Object with itemId as key and price data as value
 */
export async function getPricesForItems(itemIds) {
  const allPrices = await getLatestPrices();

  const filteredPrices = {};
  itemIds.forEach(id => {
    const itemIdStr = id.toString();
    if (allPrices[itemIdStr]) {
      filteredPrices[itemIdStr] = allPrices[itemIdStr];
    }
  });

  return filteredPrices;
}

/**
 * Gets the item mapping (ID to name, etc.)
 * This data rarely changes, so we cache it for 24 hours
 * @returns {Promise<Array>} Array of item objects
 */
export async function getItemMapping() {
  const cacheKey = 'osrs_item_mapping';

  const cachedMapping = cache.get(cacheKey);
  if (cachedMapping) {
    console.log('[OSRS Wiki] Returning cached item mapping');
    return cachedMapping;
  }

  console.log('[OSRS Wiki] Fetching item mapping from API');

  try {
    const response = await axios.get(`${WIKI_API_BASE_URL}/mapping`, {
      headers: {
        'User-Agent': USER_AGENT
      },
      timeout: 10000
    });

    const mapping = response.data;

    // Cache for 24 hours (mapping rarely changes)
    cache.set(cacheKey, mapping, 86400);

    console.log(`[OSRS Wiki] Fetched mapping for ${mapping.length} items`);

    return mapping;
  } catch (error) {
    console.error('[OSRS Wiki] Error fetching item mapping:', error.message);
    throw new Error(`Failed to fetch item mapping: ${error.message}`);
  }
}
