import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashGate() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('studywallah_entered')) {
      setShow(false);
    }
  }, []);

  const handleEnter = () => {
    setExiting(true);
    sessionStorage.setItem('studywallah_entered', 'true');
    setTimeout(() => setShow(false), 800);
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%' }}
          animate={exiting ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #ffe9f3 30%, #f0e9ff 70%, #e9f5ef 100%)',
          }}
        >
          {/* Floating decorative blobs with glow */}
          <div className="absolute inset-0 pointer-events-none">
            {[
              { size: 160, top: '8%', left: '6%', color: '#ffb5d0', delay: 0, glow: true },
              { size: 100, top: '58%', left: '10%', color: '#c8b6ff', delay: 0.5, glow: true },
              { size: 130, top: '12%', right: '8%', color: '#ffd6e5', delay: 0.3, glow: true },
              { size: 90, top: '68%', right: '12%', color: '#b8e6d4', delay: 0.7, glow: true },
              { size: 110, top: '38%', left: '42%', color: '#e0d4ff', delay: 1, glow: true },
              { size: 70, top: '25%', left: '20%', color: '#ffd9b8', delay: 0.4, glow: false },
              { size: 60, top: '75%', left: '55%', color: '#ffb5d0', delay: 0.9, glow: false },
            ].map((blob, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: blob.size,
                  height: blob.size,
                  background: blob.color,
                  opacity: blob.glow ? 0.35 : 0.25,
                  top: blob.top,
                  left: blob.left,
                  right: blob.right,
                  filter: blob.glow ? `blur(${blob.size * 0.15}px)` : 'none',
                  boxShadow: blob.glow ? `0 0 ${blob.size * 0.5}px ${blob.color}` : 'none',
                }}
                animate={{
                  y: [0, -25, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: blob.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative text-center px-6 max-w-2xl"
          >
            <motion.div
              animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-7xl md:text-8xl mb-6"
            >
              🎀
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: 'spring' }}
              className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}
            >
              ⚠️ Wait! This is only
              <br />
              for cuties! 🎀
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl mb-10"
              style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}
            >
              Are you a cutie? You need to confirm to enter this magical study
              world! ✨
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleEnter}
              className="px-10 py-4 md:px-14 md:py-5 text-xl md:text-2xl font-bold rounded-full text-white"
              style={{
                fontFamily: 'Fredoka, sans-serif',
                background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                boxShadow: '0 8px 30px rgba(255, 143, 184, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }}
            >
              Yes, I'm cutie! 💖
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-sm mt-8"
              style={{ color: '#8b85a7' }}
            >
              (Don't worry, you only need to do this once per visit! 🌸)
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
