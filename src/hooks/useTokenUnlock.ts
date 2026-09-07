import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'studywallah:token-unlocked';

function readStoredToken(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Shared token-unlock state.
 *
 * The AccessCodeGame puzzle on the homepage dispatches a
 * `studywallah:token-unlocked` window event and mirrors the result into
 * localStorage. This hook lets any page (including the standalone
 * /resource/:slug article pages) read and react to that same unlock
 * state, so a cutie who solved the puzzle stays unlocked while browsing
 * between pages.
 */
export function useTokenUnlock() {
  const [hasToken, setHasToken] = useState<boolean>(() => readStoredToken());

  useEffect(() => {
    const handler = () => setHasToken(true);
    window.addEventListener('studywallah:token-unlocked', handler);

    const storageHandler = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setHasToken(event.newValue === '1');
      }
    };
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('studywallah:token-unlocked', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  const markUnlocked = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore storage errors (private browsing, etc.) */
    }
    setHasToken(true);
    window.dispatchEvent(new CustomEvent('studywallah:token-unlocked'));
  }, []);

  return { hasToken, markUnlocked };
}
