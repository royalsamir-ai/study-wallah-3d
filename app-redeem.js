// SWS React Native app — Firebase Anonymous Auth (REST, no SDK) + token redeem.
// Needs: @react-native-async-storage/async-storage
//
// Fill in: FIREBASE_API_KEY (Project settings → General → Web API Key) and SITE_URL.

import AsyncStorage from '@react-native-async-storage/async-storage';

const FIREBASE_API_KEY = 'PASTE_WEB_API_KEY_HERE';
const SITE_URL = 'https://YOUR-WEBSITE-URL';
const DB = 'https://sws-player-default-rtdb.firebaseio.com';
const ACCESS_MS = 24 * 60 * 60 * 1000;
const AUTH_STORE = 'sws:auth';

// ---------- Anonymous sign-in: the device's real, unguessable identity ----------

async function signUpAnonymously() {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnSecureToken: true }) }
  );
  if (!res.ok) throw new Error('signup failed');
  const j = await res.json();
  return { uid: j.localId, idToken: j.idToken, refreshToken: j.refreshToken, expiresAt: Date.now() + (+j.expiresIn - 60) * 1000 };
}

async function refreshAuth(refreshToken) {
  const res = await fetch(`https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
  });
  if (!res.ok) throw new Error('refresh failed');
  const j = await res.json();
  return { uid: j.user_id, idToken: j.id_token, refreshToken: j.refresh_token, expiresAt: Date.now() + (+j.expires_in - 60) * 1000 };
}

/** Returns { uid, idToken }. The uid stays the same until the app is reinstalled/cleared. */
async function getAuth() {
  const saved = JSON.parse((await AsyncStorage.getItem(AUTH_STORE)) || 'null');
  let auth = saved;
  try {
    if (!auth) auth = await signUpAnonymously();
    else if (Date.now() >= auth.expiresAt) auth = await refreshAuth(auth.refreshToken);
  } catch (e) {
    auth = await signUpAnonymously(); // refresh token revoked → new identity
  }
  await AsyncStorage.setItem(AUTH_STORE, JSON.stringify(auth));
  return auth;
}

/** The Device ID the website must receive. */
export async function getDeviceId() {
  return (await getAuth()).uid;
}

/** Use this when opening the website from the app, e.g. Linking.openURL(await buildWebsiteUrl()). */
export async function buildWebsiteUrl() {
  return `${SITE_URL}/?uid=${encodeURIComponent(await getDeviceId())}`;
}

// ---------- Token redeem + access check ----------

async function getRecord(uid) {
  const res = await fetch(`${DB}/devices/${uid}.json`);
  if (!res.ok) throw new Error('network');
  return res.json(); // { token, createdAt, usedAt? } | null
}

/**
 * Student typed/pasted a token. Returns { ok, expiresAt?, reason? }
 * reason: 'invalid' | 'expired' | 'rejected' | 'network'
 */
export async function redeemToken(typedToken) {
  try {
    const { uid, idToken } = await getAuth();
    const rec = await getRecord(uid);
    const typed = String(typedToken).trim().toUpperCase();

    if (!rec || rec.token !== typed) return { ok: false, reason: 'invalid' };

    if (rec.usedAt) {
      const expiresAt = rec.usedAt + ACCESS_MS;
      return Date.now() < expiresAt ? { ok: true, expiresAt } : { ok: false, reason: 'expired' };
    }

    // First use. Rules accept this only from THIS signed-in device, and only once.
    const put = await fetch(`${DB}/devices/${uid}/usedAt.json?auth=${idToken}`, {
      method: 'PUT',
      body: JSON.stringify({ '.sv': 'timestamp' }),
    });
    if (!put.ok) return { ok: false, reason: 'rejected' };

    const after = await getRecord(uid); // real server timestamp
    if (!after || !after.usedAt) return { ok: false, reason: 'rejected' };
    return { ok: true, expiresAt: after.usedAt + ACCESS_MS };
  } catch (e) {
    return { ok: false, reason: 'network' };
  }
}

/** Call on app start / before opening protected content. */
export async function hasActiveAccess() {
  try {
    const { uid } = await getAuth();
    const rec = await getRecord(uid);
    return !!(rec && rec.usedAt && Date.now() < rec.usedAt + ACCESS_MS);
  } catch (e) {
    return false;
  }
}
