import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, CheckCircle2, RefreshCw, Copy, Lock, Unlock, Timer, Sparkles } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const emojis = ['🌸', '🎀', '💖', '🧁', '⭐', '🦄'];

function shuffleCards(): Card[] {
  const pairs = [...emojis, ...emojis];
  return pairs
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
}

function generateToken(): string {
  const chars = '0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CUTE-${code}`;
}

function fireConfetti() {
  const colors = ['#ffb5d0', '#c8b6ff', '#ffd6e5', '#e0d4ff', '#b8e6d4'];
  confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 }, colors });
  setTimeout(() => {
    confetti({ particleCount: 60, angle: 60, spread: 65, origin: { x: 0 }, colors });
    confetti({ particleCount: 60, angle: 120, spread: 65, origin: { x: 1 }, colors });
  }, 200);
  setTimeout(() => {
    confetti({ particleCount: 40, spread: 100, origin: { y: 0.5 }, colors });
  }, 400);
}

export default function AccessCodeGame() {
  const [cards, setCards] = useState<Card[]>(shuffleCards);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [won, setWon] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || won) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, won]);

  const handleCardClick = useCallback(
    (index: number) => {
      if (!started) setStarted(true);
      if (flippedIndices.length === 2) return;
      if (cards[index].isFlipped || cards[index].isMatched) return;

      const newCards = [...cards];
      newCards[index].isFlipped = true;
      setCards(newCards);

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        const [first, second] = newFlipped;
        if (cards[first].emoji === cards[second].emoji) {
          setTimeout(() => {
            setCards((prev) => {
              const updated = [...prev];
              updated[first].isMatched = true;
              updated[second].isMatched = true;
              return updated;
            });
            setMatches((m) => m + 1);
            setFlippedIndices([]);
          }, 500);
        } else {
          setTimeout(() => {
            setCards((prev) => {
              const updated = [...prev];
              updated[first].isFlipped = false;
              updated[second].isFlipped = false;
              return updated;
            });
            setFlippedIndices([]);
          }, 900);
        }
      }
    },
    [cards, flippedIndices, started]
  );

  useEffect(() => {
    if (matches === emojis.length) {
      setWon(true);
      setToken(generateToken());
      fireConfetti();
      try {
        window.localStorage.setItem('studywallah:token-unlocked', '1');
      } catch {
        /* ignore storage errors (private browsing, etc.) */
      }
      window.dispatchEvent(new CustomEvent('studywallah:token-unlocked'));
    }
  }, [matches]);

  const reset = () => {
    setCards(shuffleCards());
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setWon(false);
    setToken(null);
    setCopied(false);
    setTime(0);
    setStarted(false);
  };

  const copyToken = () => {
    if (token) {
      navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="game" className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-cute-radial opacity-50" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium text-sm font-semibold mb-4"
            style={{ color: '#a78bfa' }}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Play to get your magical access code! 🎀</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
            Unlock Your <span className="text-cute-gradient">Magic Code</span> ✨
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
            Match all the cute pairs to reveal your magical download token. No
            link shorteners, no paywalls — just a fun little puzzle! 💖
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="glass-premium rounded-[2.5rem] p-6 md:p-10 shadow-cute-premium"
        >
          {/* Stats bar */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm" style={{ color: '#4a4769' }}>
                <Timer className="w-4 h-4" style={{ color: '#FF8FB3' }} />
                <span className="font-mono tabular-nums font-semibold">
                  {String(Math.floor(time / 60)).padStart(2, '0')}:
                  {String(time % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#4a4769' }}>
                <span className="font-bold" style={{ color: '#FF8FB3' }}>{moves}</span>
                <span>Moves</span>
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: '#4a4769' }}>
                <span className="font-bold" style={{ color: '#a78bfa' }}>{matches}</span>
                <span>/ {emojis.length} Matched</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-cute text-sm font-semibold transition-all"
              style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
            >
              <RefreshCw className="w-4 h-4" />
              Restart 🔄
            </motion.button>
          </div>

          {/* Game board */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4 mb-8">
            {cards.map((card, index) => (
              <motion.button
                key={card.id}
                onClick={() => handleCardClick(index)}
                disabled={card.isMatched || card.isFlipped}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                className="relative aspect-square rounded-[1.5rem]"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{
                    rotateY: card.isFlipped || card.isMatched ? 180 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Card back */}
                  <div
                    className="absolute inset-0 rounded-[1.5rem] flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)',
                      border: '3px solid rgba(255, 181, 208, 0.4)',
                      boxShadow: '0 4px 15px rgba(255, 143, 184, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(255, 255, 255, 0.5)' }}>
                      <Lock className="w-5 h-5" style={{ color: '#FF8FB3' }} />
                    </div>
                  </div>
                  {/* Card front */}
                  <div
                    className="absolute inset-0 rounded-[1.5rem] flex items-center justify-center text-3xl md:text-4xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: card.isMatched
                        ? 'linear-gradient(135deg, #d4f4e9, #e0d4ff)'
                        : 'linear-gradient(135deg, #FFFDF9, #ffe9f3)',
                      border: card.isMatched
                        ? '3px solid #b8e6d4'
                        : '3px solid rgba(255, 181, 208, 0.5)',
                      boxShadow: '0 4px 15px rgba(255, 143, 184, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                    }}
                  >
                    {card.emoji}
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </div>

          {/* Result area */}
          <AnimatePresence mode="wait">
            {won ? (
              <motion.div
                key="won"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6"
                  style={{ background: 'rgba(184, 230, 212, 0.3)', border: '2px solid #b8e6d4' }}
                >
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#6bbf9b' }} />
                  <span className="text-sm font-semibold" style={{ color: '#6bbf9b', fontFamily: 'Fredoka, sans-serif' }}>
                    Puzzle Complete! 🎉
                  </span>
                </motion.div>

                <div className="glass-premium rounded-[2rem] p-6 md:p-8 max-w-md mx-auto shadow-cute-premium">
                  <div className="flex items-center justify-center gap-2 mb-3 text-sm" style={{ color: '#4a4769' }}>
                    <Unlock className="w-4 h-4" style={{ color: '#a78bfa' }} />
                    <span className="font-semibold">Your Magical Access Token 🪄</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <code className="text-2xl md:text-3xl font-bold font-mono text-cute-gradient tracking-wider" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                      {token}
                    </code>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={copyToken}
                      className="p-2.5 rounded-full glass-cute transition-all"
                      aria-label="Copy token"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5" style={{ color: '#6bbf9b' }} />
                      ) : (
                        <Copy className="w-5 h-5" style={{ color: '#4a4769' }} />
                      )}
                    </motion.button>
                  </div>
                  <p className="text-xs mt-4" style={{ color: '#8b85a7' }}>
                    Use this magical token to unlock any download below! ✨
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-sm font-medium"
                style={{ color: '#8b85a7', fontFamily: 'Quicksand, sans-serif' }}
              >
                {started ? (
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" style={{ color: '#ffb5d0' }} />
                    Keep matching pairs to reveal your magic code...
                  </span>
                ) : (
                  'Click any card to start the cute puzzle! 🌸'
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
