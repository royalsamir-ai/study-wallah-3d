import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Lock, X, FileText } from 'lucide-react';

interface TokenUnlockCardProps {
  title: string;
  hasToken: boolean;
  onTokenNeeded: () => void;
}

/**
 * The glassmorphism "Unlock with Token / Download PDF" button + confirmation
 * modal, extracted so it can be reused both on the resource cards grid and
 * at the bottom of the full-length subject article pages.
 */
export default function TokenUnlockCard({ title, hasToken, onTokenNeeded }: TokenUnlockCardProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!hasToken) {
      onTokenNeeded();
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-base font-semibold transition-all sm:w-auto sm:px-10"
        style={
          hasToken
            ? {
                background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)',
                color: '#fff',
                fontFamily: 'Fredoka, sans-serif',
                boxShadow: '0 4px 15px rgba(255, 143, 184, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              }
            : {
                background: 'rgba(255, 255, 255, 0.5)',
                color: '#4a4769',
                fontFamily: 'Fredoka, sans-serif',
                border: '2px solid rgba(255, 181, 208, 0.3)',
              }
        }
      >
        {hasToken ? (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            Unlock with Token
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(45, 42, 74, 0.3)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-premium rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-cute-premium relative"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full glass-cute flex items-center justify-center transition-all hover:scale-110"
                style={{ color: '#4a4769' }}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <motion.div
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)' }}
              >
                <FileText className="w-8 h-8" style={{ color: '#FF8FB3' }} />
              </motion.div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Fredoka, sans-serif', color: '#2E2A4A' }}>
                {title} 🎀
              </h3>
              <p className="text-sm mb-6" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
                This is a demo resource. In a production deployment, your PDF
                download would start here. Happy studying! 💖
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-full font-semibold transition-all"
                  style={{ background: 'rgba(255, 255, 255, 0.5)', color: '#4a4769', fontFamily: 'Fredoka, sans-serif' }}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-full font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)', fontFamily: 'Fredoka, sans-serif', boxShadow: '0 4px 15px rgba(255, 143, 184, 0.3)' }}
                >
                  Got it! 💖
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
