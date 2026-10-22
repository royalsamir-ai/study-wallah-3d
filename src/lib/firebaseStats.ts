/**
 * Write-only analytics: atomically increments counters in Firebase Realtime
 * Database through its REST API (server-side increment, no SDK needed).
 * Failures are swallowed on purpose — analytics must never break the page.
 */
const DB_URL = 'https://sws-player-default-rtdb.firebaseio.com';

export type StatField = 'totalVisits' | 'totalAdImpressions' | 'tokensGenerated';

export function bumpStat(field: StatField, by = 1): void {
  try {
    fetch(`${DB_URL}/web_stats/${field}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ '.sv': { increment: by } }),
      keepalive: true,
    })
      .then((res) => {
        if (!res.ok && import.meta.env.DEV) {
          console.warn(`[web_stats] ${field} write rejected (${res.status}) — check your Firebase rules.`);
        }
      })
      .catch(() => {
        /* ignore network errors */
      });
  } catch {
    /* ignore */
  }
}

const VISIT_KEY = 'sws:visit-counted';

/** Counts one visit per browser session (also safe against React StrictMode double-effects). */
export function trackVisitOnce(): void {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, '1');
  } catch {
    /* storage blocked — fall through and count once for this load */
  }
  bumpStat('totalVisits', 1);
}
