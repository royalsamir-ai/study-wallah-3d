import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Lock, ArrowUp } from 'lucide-react';
import Hero from '@/components/Hero';
import ZonesGrid from '@/components/ZonesGrid';
import AccessCodeGame from '@/components/AccessCodeGame';
import StudyResources from '@/components/StudyResources';
import PageWrapper from '@/components/PageWrapper';
import { useTokenUnlock } from '@/hooks/useTokenUnlock';

export default function Home() {
  const { hasToken } = useTokenUnlock();
  const [showPrompt, setShowPrompt] = useState(false);

  const handleTokenNeeded = useCallback(() => {
    setShowPrompt(true);
    setTimeout(() => setShowPrompt(false), 4000);
  }, []);

  return (
    <PageWrapper>
      <Hero />
      <ZonesGrid />
      <AccessCodeGame />
      <StudyResources hasToken={hasToken} onTokenNeeded={handleTokenNeeded} />

      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 glass-premium rounded-full px-6 py-4 flex items-center gap-3 shadow-cute-premium"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: 2 }}
          >
            <Lock className="w-5 h-5" style={{ color: '#FF8FB3' }} />
          </motion.div>
          <p className="text-sm font-semibold" style={{ color: '#2E2A4A', fontFamily: 'Quicksand, sans-serif' }}>
            Oops! You need your magical token to unlock this! 🪄
          </p>
        </motion.div>
      )}

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full glass-premium flex items-center justify-center transition-all"
        style={{ color: '#FF8FB3' }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </PageWrapper>
  );
}
