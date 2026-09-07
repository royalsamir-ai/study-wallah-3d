import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="relative min-h-[70vh] flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cute-radial opacity-50" />
        <div className="absolute inset-0 bg-cute-dots opacity-30" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, 0], y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #ffd6e5, #e0d4ff)', boxShadow: '0 8px 30px rgba(255, 143, 184, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)' }}
          >
            <Compass className="w-10 h-10" style={{ color: '#FF8FB3' }} />
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-bold text-cute-gradient mb-4" style={{ fontFamily: 'Fredoka, sans-serif' }}>
            404 🎀
          </h1>
          <p className="text-xl mb-8" style={{ color: '#4a4769', fontFamily: 'Quicksand, sans-serif' }}>
            Oops! This page wandered off somewhere cute... 💕
          </p>
          <motion.div
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #ffb5d0, #FF8FB3)', fontFamily: 'Fredoka, sans-serif', boxShadow: '0 6px 20px rgba(255, 143, 184, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)' }}
            >
              <Home className="w-5 h-5" />
              Back to Home 💖
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </PageWrapper>
  );
}
