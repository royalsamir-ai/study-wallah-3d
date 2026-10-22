/**
 * Device-bound, single-use magic tokens stored in Firebase Realtime Database.
 *
 *   /devices/{uid} = { token: "SWS-123456", createdAt: <server time>, usedAt?: <server time> }
 *
 * - One record per device (uid) → one device, one token at a time.
 * - The website only CREATES a pending token. The app REDEEMS it (writes usedAt, once).
 * - After redeem, access lasts 24h from usedAt; no new token can be issued until it expires.
 * The uid is the app's Firebase Anonymous-Auth uid; the rules only let THAT signed-in
 * device redeem the token. See /firebase/README.md for the rules and the app-side code.
 */
const DB_URL = 'https://sws-player-default-rtdb.firebaseio.com';
const ACCESS_MS = 24 * 60 * 60 * 1000;

export type IssueResult =
  | { status: 'issued'; token: string }
  | { status: 'active'; msLeft: number }
  | { status: 'nodevice' }
  | { status: 'error' };

interface DeviceRecord {
  token?: string;
  createdAt?: number;
  usedAt?: number;
}

/**
 * A valid Device ID is the app's Firebase Anonymous-Auth uid (long, unguessable)
 * or any plain id made of letters, digits, "_" and "-" (safe as a database key).
 */
export function isValidDeviceId(uid: string): boolean {
  return /^[A-Za-z0-9_-]{4,128}$/.test(uid);
}

/** Random 6-digit token (cryptographically random, no formula to reverse). */
export function generateRandomToken(): string {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return 'SWS-' + String(buf[0] % 1_000_000).padStart(6, '0');
}

async function readRecord(key: string): Promise<DeviceRecord | null> {
  const res = await fetch(`${DB_URL}/devices/${key}.json`);
  if (!res.ok) throw new Error('read failed');
  return (await res.json()) as DeviceRecord | null;
}

export async function issueToken(uid: string): Promise<IssueResult> {
  try {
    if (!isValidDeviceId(uid)) return { status: 'nodevice' };
    const key = uid;
    const existing = await readRecord(key);

    // A redeemed token is still inside its 24h window → no new token yet.
    if (existing?.usedAt) {
      const msLeft = existing.usedAt + ACCESS_MS - Date.now();
      if (msLeft > 0) return { status: 'active', msLeft };
    }

    const token = generateRandomToken();
    const res = await fetch(`${DB_URL}/devices/${key}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, createdAt: { '.sv': 'timestamp' } }),
    });
    // If the rules reject the write, no token is shown (it could never be redeemed).
    if (!res.ok) return { status: 'error' };
    return { status: 'issued', token };
  } catch {
    return { status: 'error' };
  }
}
