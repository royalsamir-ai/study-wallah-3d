import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'studywallah:token-unlocked';

function readStored(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * Shared token state: listens for the unlock event fired by the puzzle section
 * (memory puzzle or Security Shield), remembers it for this browser session so
 * it survives page navigation, and exposes the "token needed" prompt.
 */
export function useUnlockToken() {
  const [hasToken, setHasToken] = useState<boolean>(readStored);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = () => {
      setHasToken(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* storage unavailable — state still works for this page */
      }
    };
    window.addEventListener('studywallah:token-unlocked', handler);
    return () => window.removeEventListener('studywallah:token-unlocked', handler);
  }, []);

  const onTokenNeeded = useCallback(() => {
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 4000);
  }, []);

  return { hasToken, showPrompt, onTokenNeeded };
}
