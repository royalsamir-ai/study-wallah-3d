import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShieldCheck, Lock, Copy, CheckCircle2, AlertTriangle, Check, KeyRound, Clock, RefreshCw } from 'lucide-react';
import { bumpStat } from '@/lib/firebaseStats';
import { issueToken, isValidDeviceId, type IssueResult } from '@/lib/deviceToken';

const BOOK = '📚';
const DEFAULT_UID = '4829';
const UID_STORAGE_KEY = 'sws:uid';
const LOAD_MS = 4000;
const DECOYS = ['🌸', '🎀', '💖', '🧁', '⭐', '🦄', '🍓', '🌈'];

type Phase = 'idle' | 'cards' | 'loading' | 'done' | 'active' | 'nodevice' | 'error';

/** 3 study books + 6 cute decoys, shuffled. */
function buildTiles(): string[] {
  const decoys = [...DECOYS].sort(() => Math.random() - 0.5).slice(0, 6);
  return [BOOK, BOOK, BOOK, ...decoys].sort(() => Math.random() - 0.5);
}

/**
 * Device ID from ?uid= (the app passes its Firebase Anonymous-Auth uid). It is
 * remembered for the browser session so it survives page navigation.
 * No uid → null (a shared default id would be a security hole). In `npm run dev`
 * it falls back to 4829 so the flow can be tested locally.
 */
function readUid(): string | null {
  const fromUrl = new URLSearchParams(window.location.search).get('uid');
  if (fromUrl && isValidDeviceId(fromUrl)) {
    try {
      sessionStorage.setItem(UID_STORAGE_KEY, fromUrl);
    } catch {
      /* ignore */
    }
    return fromUrl;
  }
  try {
    const stored = sessionStorage.getItem(UID_STORAGE_KEY);
    if (stored && isValidDeviceId(stored)) return stored;
  } catch {
    /* ignore */
  }
  return import.meta.env.DEV ? DEFAULT_UID : null;
}

/** Long auth uids are shortened for display only (abcd12…wxyz). */
function shortId(uid: string): string {
  return uid.length > 14 ? `${uid.slice(0, 6)}…${uid.slice(-4)}` : uid;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function MagicTokenFlow() {
  const [uid] = useState<string | null>(readUid);
  const shownId = uid ? shortId(uid) : '—';
  const startIssue = (): Promise<IssueResult> =>
    uid ? issueToken(uid) : Promise.resolve({ status: 'nodevice' } as IssueResult);
  const [phase, setPhase] = useState<Phase>('idle');
  const [tiles, setTiles] = useState<string[]>(buildTiles);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [msLeft, setMsLeft] = useState(0);
  const impressionsSent = useRef(false);
  const issueRef = useRef<Promise<IssueResult> | null>(null);

  // Step 4: 4-second progress bar, then reveal the token (Step 5).
  useEffect(() => {
    if (phase !== 'loading') return;
    const startedAt = performance.now();
    const timer = setInterval(() => {
      const pct = Math.min(100, ((performance.now() - startedAt) / LOAD_MS) * 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        (issueRef.current ?? startIssue()).then((result) => {
          if (result.status === 'issued') {
            setToken(result.token);
            setPhase('done');
            bumpStat('tokensGenerated', 1);
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#ffb5d0', '#c8b6ff', '#ffd6e5', '#e0d4ff', '#b8e6d4'],
            });
          } else if (result.status === 'nodevice') {
            setPhase('nodevice');
          } else if (result.status === 'active') {
            setMsLeft(result.msLeft);
            setPhase('active');
          } else {
            setPhase('error');
          }
        });
      }
    }, 40);
    return () => clearInterval(timer);
  }, [phase, uid]);

  // Step 2
  const startVerification = () => {
    setPhase('cards');
    if (!impressionsSent.current) {
      impressionsSent.current = true;
      bumpStat('totalAdImpressions', 4);
    }
  };

  // Step 3
  const toggleTile = (index: number) => {
    if (phase !== 'cards') return;
    setError(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const verifyHuman = () => {
    let correct = 0;
    let wrong = 0;
    selected.forEach((i) => {
      if (tiles[i] === BOOK) correct++;
      else wrong++;
    });

    if (correct === 3 && wrong === 0) {
      setProgress(0);
      issueRef.current = startIssue();
      setPhase('loading');
    } else {
      setError(true);
      setTimeout(() => {
        setTiles(buildTiles());
        setSelected(new Set());
      }, 900);
    }
  };

  const retry = () => {
    setProgress(0);
    issueRef.current = startIssue();
    setPhase('loading');
  };

  const copyToken = async () => {
    if (!token) return;
    const ok = await copyText(token);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="glass-premium rounded-[2.5rem] p-6 md:p-10 shadow-cute-premium max-w-xl mx-auto text-center"
    >
      {/* Step 1 — Device ID badge (visible on page load) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6 break-all"
        style={{
          background: '#FFFDF9',
          border: '2px dashed #FF8FB3',
          color: '#2E2A4A',
          fontFamily: 'Fredoka, sans-serif',
        }}
      >
        <Lock className="w-4 h-4 flex-shrink-0" style={{ color: '#FF8FB3' }} />
        {uid ? <>🔒 Device ID: #{shownId} Detected</> : <>⚠️ Device ID nahi mila</>}
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 2 — start button */}
        {phase === 'idle' && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm mb-6" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Ek chhota sa cute security check pura karo aur apne SWS App ka 24-Hour Magic Token pao! 🎀
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startVerification}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white"
              style={{
                fontFamily: 'Fredoka, sans-serif',
                background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                boxShadow: '0 8px 30px rgba(255, 143, 179, 0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
            >
              <ShieldCheck className="w-5 h-5" />
              🛡️ Start Human Verification
            </motion.button>
          </motion.div>
        )}

        {/* Step 3 — cute cards */}
        {phase === 'cards' && (
          <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div
              className="rounded-2xl px-4 py-3 mb-5 text-left"
              style={{ background: '#2E2A4A', color: '#fff' }}
            >
              <span className="block text-xs opacity-80" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                Select all 3 cards with
              </span>
              <strong className="text-base" style={{ color: '#FF8FB3', fontFamily: 'Fredoka, sans-serif' }}>
                📚 Study Book
              </strong>
              <span className="float-right text-xs font-bold mt-2" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                {selected.size} / 3
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6">
              {tiles.map((emoji, index) => {
                const isSelected = selected.has(index);
                return (
                  <motion.button
                    key={`${index}-${emoji}`}
                    type="button"
                    onClick={() => toggleTile(index)}
                    initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotateY: 0, scale: isSelected ? 0.94 : 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18, delay: isSelected ? 0 : index * 0.06 }}
                    whileHover={{ scale: isSelected ? 0.97 : 1.06 }}
                    whileTap={{ scale: 0.88 }}
                    aria-pressed={isSelected}
                    aria-label={`Card ${index + 1}`}
                    className="relative aspect-square rounded-[1.5rem] flex items-center justify-center text-4xl select-none"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, #ffd6e5, #e0d4ff)'
                        : 'linear-gradient(135deg, #FFFDF9, #ffe9f3)',
                      border: isSelected ? '3px solid #FF8FB3' : '3px solid rgba(255, 181, 208, 0.5)',
                      boxShadow: isSelected
                        ? '0 6px 22px rgba(255, 143, 179, 0.45), inset 0 1px 0 rgba(255,255,255,0.5)'
                        : '0 4px 15px rgba(255, 143, 184, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
                    }}
                  >
                    {emoji}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ background: '#FF8FB3', boxShadow: '0 2px 8px rgba(255,143,179,0.5)' }}
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="flex items-center justify-center gap-2 text-sm font-semibold mb-4"
                style={{ color: '#e0577f', fontFamily: 'Quicksand, sans-serif' }}
              >
                <AlertTriangle className="w-4 h-4" />
                Galat selection! Sirf teeno 📚 Study Book wale cards select karo cuties.
              </motion.p>
            )}

            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={verifyHuman}
              className="w-full py-3.5 rounded-2xl text-base font-bold text-white"
              style={{
                fontFamily: 'Fredoka, sans-serif',
                background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                boxShadow: '0 4px 15px rgba(255, 143, 179, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              Verify I Am Human ✓
            </motion.button>
          </motion.div>
        )}

        {/* Step 4 — 4 second loading bar */}
        {phase === 'loading' && (
          <motion.div key="loading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <motion.div
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)' }}
            >
              <KeyRound className="w-8 h-8" style={{ color: '#FF8FB3' }} />
            </motion.div>
            <p className="text-sm font-semibold mb-4" style={{ color: '#2E2A4A', fontFamily: 'Fredoka, sans-serif' }}>
              🔐 Locking 24-Hr Token to Device #{shownId}...
            </p>
            <div
              className="w-full h-4 rounded-full overflow-hidden mb-2"
              style={{ background: 'rgba(255,255,255,0.6)', border: '2px solid rgba(255, 181, 208, 0.4)' }}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.floor(progress)}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #ffb5d0, #FF8FB3, #c8b6ff)',
                  boxShadow: '0 0 12px rgba(255, 143, 179, 0.6)',
                }}
              />
            </div>
            <p className="text-xs font-bold tabular-nums" style={{ color: '#FF8FB3', fontFamily: 'Fredoka, sans-serif' }}>
              {Math.floor(progress)}%
            </p>
          </motion.div>
        )}

        {/* Token already active for this device */}
        {phase === 'active' && (
          <motion.div key="active" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #d4f4e9, #e0d4ff)' }}
            >
              <Clock className="w-8 h-8" style={{ color: '#6bbf9b' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Aapka token already active hai! ✅
            </h3>
            <p className="text-sm" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Device #{shownId} ka access lagbhag{' '}
              <strong>
                {Math.floor(msLeft / 3600000)} ghante {Math.floor((msLeft % 3600000) / 60000)} minute
              </strong>{' '}
              aur chalega. Naya token tab milega jab ye khatam ho jaaye. 💖
            </p>
          </motion.div>
        )}

        {/* Opened without the app → no device to bind a token to */}
        {phase === 'nodevice' && (
          <motion.div key="nodevice" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #e0d4ff, #ffe9f3)' }}
            >
              <Lock className="w-8 h-8" style={{ color: '#a78bfa' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Token sirf SWS App se milta hai 📱
            </h3>
            <p className="text-sm" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Har token ek device se bandha hota hai. SWS App kholo aur wahin se
              is website par aao, tab aapko apna Magic Token milega. 💖
            </p>
          </motion.div>
        )}

        {/* Server problem — no token is shown because it could not be saved */}
        {phase === 'error' && (
          <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, #ffd6e5, #ffe9f3)' }}
            >
              <AlertTriangle className="w-8 h-8" style={{ color: '#e0577f' }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
              Server se connect nahi ho paya 😿
            </h3>
            <p className="text-sm mb-5" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
              Internet check karke dobara try karo.
            </p>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={retry}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white"
              style={{ fontFamily: 'Fredoka, sans-serif', background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)' }}
            >
              <RefreshCw className="w-4 h-4" />
              Dobara Try Karo
            </motion.button>
          </motion.div>
        )}

        {/* Step 5 — token display + copy */}
        {phase === 'done' && token && (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-5"
              style={{ background: 'rgba(184, 230, 212, 0.3)', border: '2px solid #b8e6d4' }}
            >
              <CheckCircle2 className="w-4 h-4" style={{ color: '#6bbf9b' }} />
              <span className="text-sm font-semibold" style={{ color: '#6bbf9b', fontFamily: 'Fredoka, sans-serif' }}>
                Verification Complete! 🎉
              </span>
            </motion.div>

            <div
              className="rounded-[2rem] p-6 mb-5"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '2px solid rgba(255, 181, 208, 0.5)',
                boxShadow: '0 8px 30px rgba(255, 143, 179, 0.2), inset 0 1px 0 rgba(255,255,255,0.6)',
              }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                Aapke Device #{shownId} ka 24-Hr Magic Token 🪄
              </p>
              <code
                className="block text-4xl md:text-5xl font-bold tracking-wider text-cute-gradient"
                style={{ fontFamily: 'Fredoka, sans-serif' }}
              >
                {token}
              </code>
              <p className="text-xs mt-3" style={{ color: '#8b85a7', fontFamily: 'Quicksand, sans-serif' }}>
                Ye token sirf is device ke liye hai aur ek hi baar use hoga. App me daalne ke baad 24 ghante tak access chalega.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={copyToken}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-base font-bold text-white"
              style={{
                fontFamily: 'Fredoka, sans-serif',
                background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                boxShadow: '0 4px 15px rgba(255, 143, 179, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied! 🎉' : '📋 Copy Token & Open SWS App'}
            </motion.button>
            {copied && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm mt-3 font-semibold"
                style={{ color: '#6bbf9b', fontFamily: 'Quicksand, sans-serif' }}
              >
                Token copy ho gaya! Ab wapas SWS App me jaakar paste kar do 💖
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[11px] mt-6" style={{ color: '#8b85a7', fontFamily: 'Quicksand, sans-serif' }}>
        Protected by SWS Shield • Study Wallah 🐰
      </p>
    </motion.div>
  );
}
