# Firebase setup — device-bound, single-use, 24h tokens

## How it works
- The app signs in to Firebase **anonymously**. That gives the device a long, unguessable
  `uid`. The app opens the website as `https://SITE/?uid=<that uid>` (`buildWebsiteUrl()`).
- Website: after the human check it saves a random `SWS-XXXXXX` at `/devices/<uid>`.
  While a redeemed token is still inside its 24h window, no new token is issued.
- App: the student pastes the token → `redeemToken()` writes `usedAt` **only if signed in as
  that same uid** and **only once** (enforced by the rules). Access = `now < usedAt + 24h`.
- A friend's phone has a different uid, so the token never matches there, and the rules
  stop a friend from redeeming it.

## Setup — do it in THIS order
1. **Console → Authentication → Sign-in method → enable "Anonymous".**
2. **Console → Realtime Database → Rules:** MERGE the `web_stats` and `devices` blocks from
   `rules-to-merge.json` into your existing rules (don't replace them — the app uses this
   database too). Test in the Rules Playground, then Publish.
3. **App:** add `app-redeem.js` (fill in `FIREBASE_API_KEY` and `SITE_URL`), open the website
   with `buildWebsiteUrl()`, verify tokens with `redeemToken()` / `hasActiveAccess()`.
   Remove the old offline formula check. Ship the app update.
4. **Website:** push this project to GitHub (auto-deploys).

If the website goes live before steps 1–3, students will see "Server se connect nahi ho paya".

## Testing the website without the app
Open `https://SITE/?uid=test1234` → you get a token for `test1234`. It can't be redeemed
(no app is signed in as `test1234`) — that is expected. Without `?uid=` the live site shows
"Token sirf SWS App se milta hai"; `npm run dev` falls back to uid `4829` for local testing.

## If `web_stats` stays empty
- Run `npm run dev` and open the browser console: a rejected write prints
  `[web_stats] ... write rejected (401/403)` → the rules are missing/not published.
- Or test the rules directly:
  `curl -X PUT -d '{".sv":{"increment":1}}' "https://sws-player-default-rtdb.firebaseio.com/web_stats/totalVisits.json"`
  → should print a number, not `Permission denied`.

## Known limits
- Anyone can still *request* a pending token for a uid they know, but it is useless unless
  that device redeems it. A rooted/modified app can fake the local "access" check — no
  client-only system can fully prevent that.
